import { memory } from '../memory/store.js';
import { eventBus } from '../events/bus.js';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';

export interface KnowledgePackage {
  fromAgentId: string;
  toAgentId: string;
  timestamp: string;
  memoryContext: string[];
  activeProjects: string[];
  pendingBlockers: Array<{ id: string; description: string; status: string }>;
  handoffNotes: string;
}

export class KnowledgeTransferManager {
  private transfersDir = '/data/agentos/transfers';

  constructor() {
    if (!existsSync(this.transfersDir)) {
      mkdirSync(this.transfersDir, { recursive: true });
    }
  }

  async initiateTransfer(fromId: string, toId: string, reason: string): Promise<KnowledgePackage> {
    const pkg: KnowledgePackage = {
      fromAgentId: fromId,
      toAgentId: toId,
      timestamp: new Date().toISOString(),
      memoryContext: memory.query(fromId).slice(0, 10).map(m => m.content),
      activeProjects: [],
      pendingBlockers: [],
      handoffNotes: `Transfer initiated: ${reason}`
    };

    const transferId = `transfer-${Date.now()}`;
    writeFileSync(
      `${this.transfersDir}/${transferId}.json`,
      JSON.stringify({ id: transferId, package: pkg, status: 'pending' }, null, 2)
    );

    eventBus.publish('transfer.initiated', 'knowledge-transfer', { transferId, from: fromId, to: toId }, 'normal');

    return pkg;
  }

  completeTransfer(transferId: string): boolean {
    const path = `${this.transfersDir}/${transferId}.json`;
    if (!existsSync(path)) return false;
    
    const record = JSON.parse(readFileSync(path, 'utf-8'));
    record.status = 'completed';
    writeFileSync(path, JSON.stringify(record, null, 2));
    return true;
  }
}

export const knowledgeTransfer = new KnowledgeTransferManager();
