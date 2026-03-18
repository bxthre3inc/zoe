import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

export class StorageManager {
  private basePath: string;

  constructor(basePath: string = '/data/agentos') {
    this.basePath = basePath;
    if (!existsSync(this.basePath)) {
      mkdirSync(this.basePath, { recursive: true });
    }
  }

  save(key: string, data: any): void {
    const path = join(this.basePath, `${key}.json`);
    const dir = path.split('/').slice(0, -1).join('/');
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(path, JSON.stringify(data, null, 2));
  }

  load(key: string): any | null {
    const path = join(this.basePath, `${key}.json`);
    if (!existsSync(path)) return null;
    return JSON.parse(readFileSync(path, 'utf-8'));
  }
}

export const storage = new StorageManager();
