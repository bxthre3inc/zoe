// Event Bus — Publish/Subscribe System

import { writeFileSync, readFileSync, existsSync, mkdirSync, readdirSync } from 'fs';

const EVENTS_DIR = '/data/agentos/events';

export interface Event {
  id: string;
  type: string;
  source: string;
  timestamp: string;
  payload: Record<string, unknown>;
  priority: 'low' | 'normal' | 'high' | 'critical';
  processed: boolean;
  subscribers: string[];
}

export class EventBus {
  subscribe(agentId: string, eventTypes: string[]): void {
    console.log(`[EVENTS] ${agentId} subscribed to ${eventTypes.join(', ')}`);
  }

  publish(type: string, source: string, payload: Record<string, unknown>, priority: Event['priority'] = 'normal'): Event {
    const event: Event = {
      id: `evt-${Date.now()}`,
      type,
      source,
      timestamp: new Date().toISOString(),
      payload,
      priority,
      processed: false,
      subscribers: []
    };

    if (!existsSync(EVENTS_DIR)) mkdirSync(EVENTS_DIR, { recursive: true });
    writeFileSync(`${EVENTS_DIR}/${event.id}.json`, JSON.stringify(event, null, 2));

    return event;
  }

  getEventsForAgent(agentId: string): Event[] {
    return [];
  }
}

export const EventTypes = {
  GRANT_POSTED: 'grant.posted',
  INVESTOR_EMAIL: 'investor.email',
  CALENDAR_EVENT: 'calendar.event',
  GITHUB_PR: 'github.pr',
  DEADLINE_APPROACHING: 'deadline.approaching',
  AGENT_STARTED: 'agent.started',
  AGENT_COMPLETED: 'agent.completed',
  BLOCKER_CREATED: 'blocker.created',
  SPRINT_ACTIVATED: 'sprint.activated',
  ALERT_RAISED: 'alert.raised',
  DAILY_REPORT_READY: 'daily_report.ready',
  PRIORITY_TASK_ASSIGNED: 'priority_task.assigned',
  DEPARTMENT_ROUTED: 'department.routed',
  BXTHRE3_UPDATE: 'bxthre3.update'
} as const;

export const eventBus = new EventBus();
