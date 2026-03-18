export interface MemoryNode {
  id: string;
  content: string;
  type: string;
  timestamp: string;
  agent: string;
  tags?: string[];
  source?: string;
}

export interface MemoryEdge {
  from: string;
  to: string;
  type: 'updates' | 'extends' | 'derives' | 'contradicts';
  timestamp: string;
}

export interface MemoryQuery {
  query: string;
  limit?: number;
  tags?: string[];
  since?: string;
  agents?: string[];
}

export interface MemoryGraph {
  nodes: Map<string, MemoryNode>;
  edges: MemoryEdge[];
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  preferences: Record<string, string>;
  timezone: string;
}
