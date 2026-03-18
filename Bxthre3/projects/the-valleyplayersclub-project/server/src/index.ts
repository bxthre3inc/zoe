import { processWager } from './engine/core';
import { GameArchitect } from './engine/architect';
import { db, initDatabase } from './db';
import { OllamaManager } from './engine/ollamaManager';
import { WalletProcessor } from './engine/wallet';
import { PartnerIntegrationManager, MockPartnerIntegration } from './integrations/PartnerIntegrationManager';
import { GamificationService } from './services/GamificationService';
import { ComplianceService } from './services/ComplianceService';
import { PaymentService } from './services/PaymentService';
import { CashNetworkService } from './services/CashNetworkService';
import { PromotionService } from './services/PromotionService';
import { SocialEngine } from './services/SocialEngine';
import { PersonalizationService } from './services/PersonalizationService';
import { ProfileService } from './services/ProfileService';
import { CompetitionEngine } from './services/CompetitionEngine';
import { MembershipService } from './services/MembershipService';
import { SecuredCashService } from './services/SecuredCashService';
import pino from 'pino';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const logger = pino({
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
  transport: process.env.NODE_ENV !== 'production' ? {
    target: 'pino-pretty',
    options: { colorize: true }
  } : undefined
});

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-only-use-in-local';
const DIST_PATH = '/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/dist';

const rateLimits = new Map<string, { count: number, lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 1000;
const MAX_MESSAGES_PER_WINDOW = 10;

const partnerManager = PartnerIntegrationManager.getInstance();
partnerManager.registerPartner('rsweeps', new MockPartnerIntegration({ id: 'rsweeps', name: 'RSweeps', type: 'deep' }));
partnerManager.registerPartner('fire-kirin', new MockPartnerIntegration({ id: 'fire-kirin', name: 'Fire Kirin', type: 'api' }));

await initDatabase();
await ComplianceService.initTables();
await PaymentService.initTables();
await CashNetworkService.initTables();
await PromotionService.initTables();
await SocialEngine.initTables();
await PersonalizationService.initTables();
await ProfileService.initTables();
await CompetitionEngine.initTables();
await MembershipService.initTables();
await OllamaManager.init();

const port = parseInt(process.env.PORT || '3001');

const server = Bun.serve<{ authToken: string; userId?: string }>({
    port,
    async fetch(req, server) {
        const url = new URL(req.url);
        const pathname = url.pathname;
        const method = req.method;
        
        // CORS headers for all responses
        const origin = req.headers.get('Origin');
        const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'];
        const headers = new Headers({
            'Content-Type': 'application/json',
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
        });
        
        if (origin && allowedOrigins.includes(origin)) {
            headers.set('Access-Control-Allow-Origin', origin);
            headers.set('Access-Control-Allow-Credentials', 'true');
            headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        }

        // Handle preflight
        if (method === 'OPTIONS') {
            return new Response(null, { status: 204, headers });
        }
        
        // 1. Health Check
        if (pathname === '/health') {
            return new Response(JSON.stringify({ 
                status: 'alive', 
                environment: process.env.NODE_ENV || 'development',
                timestamp: new Date().toISOString() 
            }), { headers });
        }

        // 2. Static File Serving (NEW - serves frontend)
        if (!pathname.startsWith('/api/') && pathname !== '/health') {
            let filePath = pathname === '/' ? '/index.html' : pathname;
            const safePath = filePath.replace(/\.\./g, '');
            const fullPath = `${DIST_PATH}${safePath}`;
            
            const file = Bun.file(fullPath);
            if (await file.exists()) {
                return new Response(file);
            }
            
            // SPA fallback
            const indexFile = Bun.file(`${DIST_PATH}/index.html`);
            if (await indexFile.exists()) {
                return new Response(indexFile);
            }
        }

        // 3. Auth validation for API routes
        const authHeader = req.headers.get('Authorization');
        const token = url.searchParams.get('token') || (authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null);
        
        let decoded: any = null;
        if (token) {
            try {
                decoded = jwt.verify(token, JWT_SECRET);
            } catch {
                if (process.env.NODE_ENV === 'production') {
                    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
                }
            }
        }

        // 4. HTTP API Routes
        
        // --- Secured Cash Partner Routes ---
        
        // Register new secured partner
        if (pathname === '/api/cash/secured/partner/register' && method === 'POST') {
            try {
                const body = await req.json();
                const { id, name, location } = body;
                
                if (!id || !name || !location) {
                    return new Response(JSON.stringify({ error: 'Missing required fields: id, name, location' }), { status: 400, headers });
                }
                
                const partner = await SecuredCashService.registerPartner({ id, name, location });
                return new Response(JSON.stringify({ success: true, partner }), { status: 201, headers });
            } catch (err: any) {
                logger.error(err, 'Partner registration error');
                return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
            }
        }
        
        // Add collateral to partner
        if (pathname === '/api/cash/secured/partner/collateral' && method === 'POST') {
            try {
                const body = await req.json();
                const { partnerId, amount, method } = body;
                
                if (!partnerId || !amount || amount <= 0) {
                    return new Response(JSON.stringify({ error: 'Missing partnerId or invalid amount' }), { status: 400, headers });
                }
                
                const result = await SecuredCashService.addCollateral(partnerId, amount, method || 'bank_transfer');
                return new Response(JSON.stringify({ success: true, ...result }), { headers });
            } catch (err: any) {
                logger.error(err, 'Collateral deposit error');
                return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
            }
        }
        
        // Get partner status
        if (pathname.startsWith('/api/cash/secured/partner/') && method === 'GET') {
            try {
                const partnerId = pathname.split('/').pop();
                if (!partnerId) return new Response(JSON.stringify({ error: 'Missing partner ID' }), { status: 400, headers });
                
                const partner = await SecuredCashService.getPartner(partnerId);
                if (!partner) return new Response(JSON.stringify({ error: 'Partner not found' }), { status: 404, headers });
                
                const tierConfig = SecuredCashService.getTierConfig(partner.tier);
                
                return new Response(JSON.stringify({ 
                    success: true, 
                    partner,
                    tierConfig,
                    canAcceptDeposits: partner.availableCapacity > 0 && partner.status === 'active'
                }), { headers });
            } catch (err: any) {
                logger.error(err, 'Partner fetch error');
                return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
            }
        }
        
        // List all partners
        if (pathname === '/api/cash/secured/partners' && method === 'GET') {
            try {
                const partners = await SecuredCashService.getAllPartners();
                return new Response(JSON.stringify({ success: true, count: partners.length, partners }), { headers });
            } catch (err: any) {
                logger.error(err, 'Partners list error');
                return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
            }
        }
        
        // Log cash drop
        if (pathname === '/api/cash/secured/drop' && method === 'POST') {
            try {
                const body = await req.json();
                const { partnerId, amount, dropType, verificationMethod } = body;
                
                if (!partnerId || !amount || amount <= 0) {
                    return new Response(JSON.stringify({ error: 'Missing partnerId or invalid amount' }), { status: 400, headers });
                }
                
                const result = await SecuredCashService.logCashDrop(
                    partnerId, 
                    amount, 
                    dropType || 'bank', 
                    verificationMethod || 'photo'
                );
                return new Response(JSON.stringify({ success: true, ...result }), { headers });
            } catch (err: any) {
                logger.error(err, 'Cash drop error');
                return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
            }
        }
        
        // Verify cash drop
        if (pathname === '/api/cash/secured/drop/verify' && method === 'POST') {
            try {
                const body = await req.json();
                const { dropId, verifiedBy, approved } = body;
                
                if (!dropId || verifiedBy === undefined) {
                    return new Response(JSON.stringify({ error: 'Missing dropId or verifiedBy' }), { status: 400, headers });
                }
                
                const result = await SecuredCashService.verifyCashDrop(dropId, verifiedBy, approved === true);
                return new Response(JSON.stringify({ success: true, ...result }), { headers });
            } catch (err: any) {
                logger.error(err, 'Drop verification error');
                return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
            }
        }

        // --- Existing Cash Routes (legacy/simple) ---
        
        // 4. CASH DEPOSIT API ROUTES
        if (pathname.startsWith('/api/cash')) {
            try {
                // POST /api/cash/deposit/request - Create deposit token
                if (pathname === '/api/cash/deposit/request' && method === 'POST') {
                    const body = await req.json();
                    const { userId, amount } = body;
                    
                    if (!userId || !amount || amount <= 0) {
                        return new Response(JSON.stringify({ 
                            error: 'Missing or invalid userId/amount' 
                        }), { status: 400, headers });
                    }
                    
                    const result = await CashNetworkService.createDepositRequest(userId, amount);
                    return new Response(JSON.stringify({
                        success: true,
                        token: result.token,
                        amount: result.amount,
                        qrData: `VPC-CASH:${result.token}`,
                        expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 min expiry
                    }), { headers });
                }
                
                // POST /api/cash/deposit/confirm - Partner confirms deposit
                if (pathname === '/api/cash/deposit/confirm' && method === 'POST') {
                    const body = await req.json();
                    const { partnerId, token } = body;
                    
                    if (!partnerId || !token) {
                        return new Response(JSON.stringify({ 
                            error: 'Missing partnerId or token' 
                        }), { status: 400, headers });
                    }
                    
                    const result = await CashNetworkService.confirmDeposit(partnerId, token);
                    return new Response(JSON.stringify({
                        success: true,
                        userId: result.userId,
                        amountDeposited: result.amount,
                        commissionEarned: result.commission,
                        message: `Successfully credited ${result.amount} VLY to player account`
                    }), { headers });
                }
                
                // GET /api/cash/partners - List all partners
                if (pathname === '/api/cash/partners' && method === 'GET') {
                    const result = await db.execute('SELECT id, name, location, commission_tier, balance FROM cash_partners');
                    const partners = result.rows.map(row => ({
                        id: row.id,
                        name: row.name,
                        location: row.location,
                        commissionTier: row.commission_tier,
                        balance: row.balance
                    }));
                    return new Response(JSON.stringify({ partners }), { headers });
                }
                
                // POST /api/cash/partners - Register new partner
                if (pathname === '/api/cash/partners' && method === 'POST') {
                    const body = await req.json();
                    const { id, name, location, commissionTier } = body;
                    
                    if (!id || !name || !location) {
                        return new Response(JSON.stringify({ 
                            error: 'Missing required fields: id, name, location' 
                        }), { status: 400, headers });
                    }
                    
                    await CashNetworkService.registerPartner({
                        id,
                        name,
                        location,
                        commissionTier: commissionTier || 'bronze'
                    });
                    
                    return new Response(JSON.stringify({
                        success: true,
                        message: `Partner ${name} registered successfully`,
                        partner: { id, name, location, commissionTier: commissionTier || 'bronze' }
                    }), { status: 201, headers });
                }
                
                // GET /api/cash/deposit/history/:userId - Get deposit history
                if (pathname.startsWith('/api/cash/deposit/history/') && method === 'GET') {
                    const userId = pathname.split('/').pop();
                    const result = await db.execute({
                        sql: `SELECT token, amount, status, partner_id, created_at, processed_at 
                              FROM cash_deposit_requests WHERE user_id = ? ORDER BY created_at DESC`,
                        args: [userId]
                    });
                    
                    const deposits = result.rows.map(row => ({
                        token: row.token,
                        amount: row.amount,
                        status: row.status,
                        partnerId: row.partner_id,
                        createdAt: row.created_at,
                        processedAt: row.processed_at
                    }));
                    
                    return new Response(JSON.stringify({ deposits }), { headers });
                }
                
                return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers });
                
            } catch (err: any) {
                logger.error({ err, pathname }, 'Cash API error');
                return new Response(JSON.stringify({ 
                    error: err.message || 'Internal server error' 
                }), { status: 500, headers });
            }
        }

        // WebSocket upgrade
        const success = server.upgrade(req, { 
            data: { 
                authToken: token || 'anonymous',
                userId: decoded?.userId || url.searchParams.get('userId') || undefined
            } 
        });
        
        if (success) return undefined;
        return new Response("Valley Players Club - Full Stack (API + Static)");
    },
    websocket: {
        async open(ws) {
            logger.info({ userId: ws.data.userId }, `[+] Socket opened`);
        },
        async message(ws, message) {
            const userId = ws.data.userId || 'anonymous';
            
            const now = Date.now();
            const limit = rateLimits.get(userId) || { count: 0, lastReset: now };
            if (now - limit.lastReset > RATE_LIMIT_WINDOW_MS) {
                limit.count = 0;
                limit.lastReset = now;
            }
            limit.count++;
            rateLimits.set(userId, limit);

            if (limit.count > MAX_MESSAGES_PER_WINDOW) {
                logger.warn({ userId }, "Rate limit exceeded");
                ws.send(JSON.stringify({ type: 'error', message: "Rate limit exceeded" }));
                return;
            }

            try {
                const payload = JSON.parse(message.toString());
                const { type, data } = payload;
                
                logger.debug({ type, userId: ws.data.userId }, "Incoming WS message");

                switch (type) {
                    case 'game:action': {
                        const { gameId, category, wager, actionPayload, userTier, userId: dataUserId } = data;
                        const targetUserId = dataUserId || ws.data.userId;
                        if (!targetUserId) throw new Error("Missing userId");
                        
                        const membership = await MembershipService.getActiveMembership(targetUserId);
                        const activeTier = membership ? membership.rtpProfile : (userTier || 'standard');
                        const result = await processWager(targetUserId, gameId, category, wager, actionPayload, activeTier);
                        ws.send(JSON.stringify({ type: 'game:result', data: result }));
                        break;
                    }
                    case 'balance:sync': {
                        const targetUserId = data.userId || ws.data.userId;
                        if (!targetUserId) throw new Error("Missing userId");
                        const wallet = await WalletProcessor.getWallet(targetUserId);
                        ws.send(JSON.stringify({ type: 'balance:update', data: { balance: wallet.balances.cash, xp: wallet.xp, level: wallet.level }}));
                        break;
                    }
                    default:
                        ws.send(JSON.stringify({ type: 'error', message: `Unknown type: ${type}` }));
                }
            } catch (err) {
                logger.error(err, "WebSocket error");
            }
        },
        async close(ws) {
            logger.info({ userId: ws.data.userId }, `[-] Socket closed`);
        },
    },
});

// Initialize SecuredCashService tables on startup
await SecuredCashService.initTables();

logger.info(`🚀 VPC Edge Server (Full Stack) running at ${server.hostname}:${server.port}`);
