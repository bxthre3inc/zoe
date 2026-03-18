import { directGmail } from './direct-gmail.js';

export type Priority = 'low' | 'normal' | 'high' | 'critical';

export class GmailHybridIntegration {
  private useDirect = true;

  async findEmails(query: string, priority: Priority = 'normal', maxResults: number = 10): Promise<any[]> {
    try {
      if (this.useDirect) {
        return await directGmail.findEmails(query, maxResults);
      }
    } catch (err) {
      console.log(`[GMAIL] Direct failed, fallback not implemented: ${err}`);
      return [];
    }
    return [];
  }

  setMode(direct: boolean): void {
    this.useDirect = direct;
  }
}

export const hybridGmail = new GmailHybridIntegration();
