// State Snapshots — Backup & Rollback for AgentOS
// Gap 2: Need ability to rollback state if bad config deployed

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, cpSync, rmSync, statSync } from 'fs';
import { execSync } from 'child_process';

const SNAPSHOTS_DIR = '/home/.z/agentos/snapshots';
const STATE_DIRS = [
  '/home/.z/agentos/events',
  '/home/.z/agentos/inbox',
  '/home/.z/agentos/escalations',
  '/home/.z/agentos/standups',
  '/home/.z/agentos/sprints',
  '/home/.z/agentos/subagents',
  '/home/.z/employee-status',
  '/home/.z/employee-comms',
  '/home/workspace/Bxthre3/projects/the-agentos-project/settings'
];

export interface Snapshot {
  id: string;
  timestamp: string;
  label: string;
  description: string;
  sizeBytes: number;
  fileCount: number;
  autoCreated: boolean;
}

export class SnapshotManager {
  constructor() {
    this.ensureDirs();
  }

  private ensureDirs(): void {
    if (!existsSync(SNAPSHOTS_DIR)) mkdirSync(SNAPSHOTS_DIR, { recursive: true });
  }

  // Create a snapshot
  create(label: string, description: string, auto = false): Snapshot {
    const id = `snap-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const snapshotDir = `${SNAPSHOTS_DIR}/${id}`;
    mkdirSync(snapshotDir, { recursive: true });

    let fileCount = 0;
    let totalSize = 0;

    // Copy all state directories
    for (const stateDir of STATE_DIRS) {
      if (!existsSync(stateDir)) continue;

      const targetDir = `${snapshotDir}/${stateDir.replace(/\//g, '_')}`;
      mkdirSync(targetDir, { recursive: true });

      try {
        // Copy directory contents
        this.copyDir(stateDir, targetDir);
        
        // Count files and size
        const stats = this.getDirStats(targetDir);
        fileCount += stats.count;
        totalSize += stats.size;
      } catch {}
    }

    const snapshot: Snapshot = {
      id,
      timestamp: new Date().toISOString(),
      label,
      description,
      sizeBytes: totalSize,
      fileCount,
      autoCreated: auto
    };

    writeFileSync(`${snapshotDir}/_metadata.json`, JSON.stringify(snapshot, null, 2));

    return snapshot;
  }

  private copyDir(source: string, target: string): void {
    if (!existsSync(source)) return;

    for (const item of readdirSync(source)) {
      const srcPath = `${source}/${item}`;
      const tgtPath = `${target}/${item}`;

      try {
        const stat = statSync(srcPath);
        if (stat.isDirectory()) {
          mkdirSync(tgtPath, { recursive: true });
          this.copyDir(srcPath, tgtPath);
        } else {
          cpSync(srcPath, tgtPath);
        }
      } catch {}
    }
  }

  private getDirStats(dir: string): { count: number; size: number } {
    let count = 0;
    let size = 0;

    if (!existsSync(dir)) return { count, size };

    for (const item of readdirSync(dir)) {
      const path = `${dir}/${item}`;
      try {
        const stat = statSync(path);
        if (stat.isDirectory()) {
          const sub = this.getDirStats(path);
          count += sub.count;
          size += sub.size;
        } else {
          count++;
          size += stat.size;
        }
      } catch {}
    }

    return { count, size };
  }

  // Auto-create snapshot before risky operations
  autoSnapshot(operation: string): Snapshot {
    return this.create(
      `auto-${operation}`,
      `Auto-created before ${operation}`,
      true
    );
  }

  // List all snapshots
  list(): Snapshot[] {
    if (!existsSync(SNAPSHOTS_DIR)) return [];

    const snapshots: Snapshot[] = [];

    for (const dir of readdirSync(SNAPSHOTS_DIR)) {
      const metaPath = `${SNAPSHOTS_DIR}/${dir}/_metadata.json`;
      if (!existsSync(metaPath)) continue;

      try {
        const snapshot = JSON.parse(readFileSync(metaPath, 'utf-8'));
        snapshots.push(snapshot);
      } catch {}
    }

    return snapshots.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  // Get snapshot by ID
  get(id: string): Snapshot | null {
    const metaPath = `${SNAPSHOTS_DIR}/${id}/_metadata.json`;
    if (!existsSync(metaPath)) return null;

    try {
      return JSON.parse(readFileSync(metaPath, 'utf-8'));
    } catch {
      return null;
    }
  }

  // Rollback to snapshot
  rollback(snapshotId: string): boolean {
    const snapshot = this.get(snapshotId);
    if (!snapshot) return false;

    const snapshotDir = `${SNAPSHOTS_DIR}/${snapshotId}`;
    if (!existsSync(snapshotDir)) return false;

    // Create emergency backup of current state before rollback
    this.create('pre-rollback-emergency', `Emergency backup before rollback to ${snapshotId}`, true);

    // Restore each state directory
    for (const stateDir of STATE_DIRS) {
      const backupDir = `${snapshotDir}/${stateDir.replace(/\//g, '_')}`;
      if (!existsSync(backupDir)) continue;

      // Clear current state
      if (existsSync(stateDir)) {
        rmSync(stateDir, { recursive: true, force: true });
      }

      // Restore from snapshot
      mkdirSync(stateDir, { recursive: true });
      this.copyDir(backupDir, stateDir);
    }

    return true;
  }

  // Delete old snapshots (keep last N)
  cleanup(keepCount = 10): void {
    const snapshots = this.list();
    const toDelete = snapshots.slice(keepCount);

    for (const snapshot of toDelete) {
      const dir = `${SNAPSHOTS_DIR}/${snapshot.id}`;
      if (existsSync(dir)) {
        rmSync(dir, { recursive: true, force: true });
      }
    }
  }

  // Diff between current state and snapshot
  diff(snapshotId: string): Array<{ path: string; status: 'added' | 'removed' | 'modified' }> {
    const snapshot = this.get(snapshotId);
    if (!snapshot) return [];

    const snapshotDir = `${SNAPSHOTS_DIR}/${snapshotId}`;
    const differences: Array<{ path: string; status: 'added' | 'removed' | 'modified' }> = [];

    for (const stateDir of STATE_DIRS) {
      const backupDir = `${snapshotDir}/${stateDir.replace(/\//g, '_')}`;
      
      // Check for added/modified files
      if (existsSync(stateDir)) {
        for (const file of this.listFilesRecursive(stateDir)) {
          const relativePath = file.replace(stateDir, '');
          const backupFile = `${backupDir}${relativePath}`;

          if (!existsSync(backupFile)) {
            differences.push({ path: file, status: 'added' });
          } else {
            const current = readFileSync(file, 'utf-8');
            const backup = readFileSync(backupFile, 'utf-8');
            if (current !== backup) {
              differences.push({ path: file, status: 'modified' });
            }
          }
        }
      }

      // Check for removed files
      if (existsSync(backupDir)) {
        for (const file of this.listFilesRecursive(backupDir)) {
          const relativePath = file.replace(backupDir, '');
          const currentFile = `${stateDir}${relativePath}`;

          if (!existsSync(currentFile)) {
            differences.push({ path: currentFile, status: 'removed' });
          }
        }
      }
    }

    return differences;
  }

  private listFilesRecursive(dir: string): string[] {
    const files: string[] = [];

    if (!existsSync(dir)) return files;

    for (const item of readdirSync(dir)) {
      const path = `${dir}/${item}`;
      try {
        const stat = statSync(path);
        if (stat.isDirectory()) {
          files.push(...this.listFilesRecursive(path));
        } else {
          files.push(path);
        }
      } catch {}
    }

    return files;
  }

  // Get current state summary
  getCurrentState(): { timestamp: string; dirs: Record<string, { files: number; size: number }> } {
    const dirs: Record<string, { files: number; size: number }> = {};

    for (const stateDir of STATE_DIRS) {
      const stats = this.getDirStats(stateDir);
      dirs[stateDir] = { files: stats.count, size: stats.size };
    }

    return { timestamp: new Date().toISOString(), dirs };
  }
}

export const snapshotManager = new SnapshotManager();
