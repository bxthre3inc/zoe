// WAR ROOM — Consensus Voting System
// When 4/5 agents agree, decision executes without human

import { EventEmitter } from 'events';

export interface Vote {
  agentId: string;
  decision: 'approve' | 'reject' | 'abstain';
  confidence: number; // 0-100
  reasoning: string;
  timestamp: string;
}

export interface Proposal {
  id: string;
  type: 'funding' | 'partnership' | 'hiring' | 'strategy' | 'technical';
  title: string;
  description: string;
  context: {
    riskScore: number;
    urgency: 'low' | 'medium' | 'high' | 'critical';
    revenue?: number;
    timeline?: string;
  };
  votes: Vote[];
  status: 'pending' | 'approved' | 'rejected' | 'escalated';
  createdAt: string;
  deadline: string;
}

export class WarRoom extends EventEmitter {
  private proposals: Map<string, Proposal> = new Map();
  private readonly THRESHOLD = 0.8; // 4/5 = 80%
  private readonly MIN_VOTES = 4;   // Need at least 4 votes
  private readonly AUTO_EXECUTE = true;

  // Submit proposal to WAR ROOM
  submitProposal(
    type: Proposal['type'],
    title: string,
    description: string,
    context: Proposal['context'],
    votingHours: number = 24
  ): string {
    const id = `WAR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const proposal: Proposal = {
      id,
      type,
      title,
      description,
      context,
      votes: [],
      status: 'pending',
      createdAt: new Date().toISOString(),
      deadline: new Date(Date.now() + votingHours * 60 * 60 * 1000).toISOString()
    };

    this.proposals.set(id, proposal);
    
    // Auto-request votes from relevant agents
    this.requestVotes(proposal);
    
    this.emit('proposalSubmitted', proposal);
    return id;
  }

  // Cast vote
  vote(proposalId: string, vote: Omit<Vote, 'timestamp'>): boolean {
    const proposal = this.proposals.get(proposalId);
    if (!proposal || proposal.status !== 'pending') return false;

    // Check deadline
    if (new Date() > new Date(proposal.deadline)) {
      this.checkConsensus(proposalId);
      return false;
    }

    // Check if agent already voted
    const existingIndex = proposal.votes.findIndex(v => v.agentId === vote.agentId);
    const fullVote: Vote = { ...vote, timestamp: new Date().toISOString() };

    if (existingIndex >= 0) {
      proposal.votes[existingIndex] = fullVote;
    } else {
      proposal.votes.push(fullVote);
    }

    this.emit('voteCast', { proposalId, vote: fullVote });

    // Check if we have consensus
    this.checkConsensus(proposalId);
    
    return true;
  }

  // Check if consensus reached
  private checkConsensus(proposalId: string): void {
    const proposal = this.proposals.get(proposalId);
    if (!proposal || proposal.status !== 'pending') return;

    const totalVotes = proposal.votes.length;
    const approveVotes = proposal.votes.filter(v => v.decision === 'approve').length;
    const rejectVotes = proposal.votes.filter(v => v.decision === 'reject').length;
    const avgConfidence = proposal.votes.reduce((sum, v) => sum + v.confidence, 0) / totalVotes || 0;

    // Need minimum votes
    if (totalVotes < this.MIN_VOTES) return;

    const approveRatio = approveVotes / totalVotes;
    const rejectRatio = rejectVotes / totalVotes;

    // 4/5 threshold reached
    if (approveRatio >= this.THRESHOLD) {
      proposal.status = 'approved';
      this.emit('consensusReached', { proposal, decision: 'approved', votes: totalVotes });
      
      if (this.AUTO_EXECUTE) {
        this.executeDecision(proposal);
      }
    }
    // 4/5 rejection threshold
    else if (rejectRatio >= this.THRESHOLD) {
      proposal.status = 'rejected';
      this.emit('consensusReached', { proposal, decision: 'rejected', votes: totalVotes });
    }
    // High confidence override (if all voters 90%+ confident)
    else if (avgConfidence >= 90 && approveRatio >= 0.6) {
      proposal.status = 'approved';
      this.emit('consensusReached', { 
        proposal, 
        decision: 'approved', 
        votes: totalVotes,
        override: 'high_confidence' 
      });
      
      if (this.AUTO_EXECUTE) {
        this.executeDecision(proposal);
      }
    }
  }

  // Auto-execute approved decision
  private executeDecision(proposal: Proposal): void {
    this.emit('decisionExecuted', {
      proposalId: proposal.id,
      type: proposal.type,
      title: proposal.title,
      timestamp: new Date().toISOString()
    });
  }

  // Request votes from relevant agents
  private requestVotes(proposal: Proposal): void {
    const relevantAgents = this.getRelevantAgents(proposal.type);
    
    this.emit('voteRequested', {
      proposalId: proposal.id,
      agents: relevantAgents,
      deadline: proposal.deadline
    });
  }

  // Get agents relevant to decision type
  private getRelevantAgents(type: Proposal['type']): string[] {
    const agentMap: Record<typeof type, string[]> = {
      funding: ['taylor', 'alex', 'maya'],
      partnership: ['alex', 'taylor', 'raj'],
      hiring: ['maya', 'raj', 'taylor'],
      strategy: ['alex', 'jordan', 'taylor'],
      technical: ['maya', 'riley', 'drew']
    };
    
    return agentMap[type] || ['alex', 'taylor', 'maya', 'raj'];
  }

  // Force escalation to human (for urgent/critical)
  escalate(proposalId: string, reason: string): boolean {
    const proposal = this.proposals.get(proposalId);
    if (!proposal) return false;

    proposal.status = 'escalated';
    this.emit('escalated', { proposal, reason, to: 'brodiblanco' });
    
    return true;
  }

  // Get proposal status
  getStatus(proposalId: string): Proposal | null {
    return this.proposals.get(proposalId) || null;
  }

  // List all proposals
  list(status?: Proposal['status']): Proposal[] {
    const all = Array.from(this.proposals.values());
    return status ? all.filter(p => p.status === status) : all;
  }

  // Quick vote summary
  getVoteSummary(proposalId: string): {
    total: number;
    approve: number;
    reject: number;
    abstain: number;
    threshold: number;
    reached: boolean;
  } | null {
    const proposal = this.proposals.get(proposalId);
    if (!proposal) return null;

    const approve = proposal.votes.filter(v => v.decision === 'approve').length;
    const reject = proposal.votes.filter(v => v.decision === 'reject').length;
    const abstain = proposal.votes.filter(v => v.decision === 'abstain').length;
    const total = proposal.votes.length;

    return {
      total,
      approve,
      reject,
      abstain,
      threshold: this.THRESHOLD,
      reached: (approve / total) >= this.THRESHOLD && total >= this.MIN_VOTES
    };
  }
}

export const warRoom = new WarRoom();
