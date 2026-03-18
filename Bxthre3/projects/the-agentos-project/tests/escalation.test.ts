import { escalationClock } from '../core/escalation/clock';
import { org } from '../core/hierarchy/org';

describe('Escalation Clock', () => {
  test('registers blocker with 24h deadline', () => {
    const blocker = {
      id: 'test-blocker-1',
      employeeId: 'jordan-fundraising',
      description: 'Test blocker',
      blockingSince: new Date().toISOString(),
      severity: 'p1' as const,
      assignedManager: 'taylor',
      resolutionDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      peerHelpRequested: false,
      humanEscalationPending: false,
      attemptedResolutions: [],
      neededFromOthers: []
    };
    
    escalationClock.register(blocker);
    const active = escalationClock.getActive();
    
    expect(active).toHaveLength(1);
    expect(active[0].id).toBe('test-blocker-1');
    expect(active[0].notifiedPeerHelp).toBe(false);
  });

  test('resolves blocker and archives', () => {
    // Setup and resolve
    const resolved = escalationClock.resolve('test-blocker-1', 'Fixed by manager');
    expect(resolved).toBe(true);
    expect(escalationClock.getActive()).toHaveLength(0);
  });
});
