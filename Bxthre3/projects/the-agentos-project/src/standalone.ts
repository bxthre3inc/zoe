// AgentOS Standalone Entry Point
// Zo-hosted but fully independent stack

import { AgentOS } from '../core/index.js';

async function main(): Promise<void> {
  console.log('=== AGENTOS 3.1 STARTING ===');
  
  try {
    await AgentOS.start();
    console.log('AgentOS running. 20 employees active.');
    console.log('Next briefing: 5:30 AM or PM');
  } catch (err) {
    console.error('Failed to start:', err);
    process.exit(1);
  }
}

main();
