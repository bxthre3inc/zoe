// Department Router — Specialized Agent Departments
// Route events to AI/ML, PM, Requirements, Sales, Strategy, Legal, Engineering

import { EventEmitter } from 'events';
import { eventBus, EventTypes } from '../events/bus';

export type DepartmentType = 
  | 'aiml'        // AI/ML Research & Development
  | 'pm'          // Product Management
  | 'requirements' // Requirements Engineering
  | 'sales'       // Sales & Investor Relations
  | 'strategy'    // Strategy & Business Development
  | 'legal'       // Legal & Compliance
  | 'engineering' // Software Engineering
  | 'operations'  // Operations & Finance
  | 'marketing';  // Marketing & Communications

export interface Department {
  type: DepartmentType;
  name: string;
  description: string;
  lead: string; // Lead agent ID
  agents: string[]; // Agent IDs in department
  capabilities: string[];
  queue: DepartmentTask[];
  metrics: {
    tasksCompleted: number;
    avgResponseTime: number; // hours
    satisfaction: number; // 0-100
  };
}

export interface DepartmentTask {
  id: string;
  type: string;
  source: string;
  content: string;
  priority: 'p0' | 'p1' | 'p2' | 'p3';
  assignedTo: string | null;
  status: 'queued' | 'assigned' | 'in_progress' | 'completed' | 'blocked';
  createdAt: string;
  deadline?: string;
  context: Record<string, any>;
}

export class DepartmentRouter extends EventEmitter {
  private departments: Map<DepartmentType, Department> = new Map();
  private taskCounter = 0;

  constructor() {
    super();
    this.setupDepartments();
    this.setupEventListeners();
  }

  private setupDepartments(): void {
    // AI/ML Department
    this.departments.set('aiml', {
      type: 'aiml',
      name: 'AI/ML Research',
      description: 'Machine learning models, agent improvements, research',
      lead: 'iris',
      agents: ['iris', 'drew', 'theo'],
      capabilities: ['model_training', 'agent_optimization', 'nlp', 'computer_vision'],
      queue: [],
      metrics: { tasksCompleted: 0, avgResponseTime: 0, satisfaction: 95 }
    });

    // Product Management
    this.departments.set('pm', {
      type: 'pm',
      name: 'Product Management',
      description: 'Roadmap, prioritization, user feedback, feature specs',
      lead: 'riley',
      agents: ['riley', 'alex'],
      capabilities: ['roadmap_planning', 'user_research', 'prioritization', 'feature_specs'],
      queue: [],
      metrics: { tasksCompleted: 0, avgResponseTime: 0, satisfaction: 90 }
    });

    // Requirements Engineering
    this.departments.set('requirements', {
      type: 'requirements',
      name: 'Requirements Engineering',
      description: 'Technical specifications, system design, architecture',
      lead: 'drew',
      agents: ['drew', 'iris', 'theo'],
      capabilities: ['system_design', 'architecture_docs', 'api_specs', 'technical_writing'],
      queue: [],
      metrics: { tasksCompleted: 0, avgResponseTime: 0, satisfaction: 92 }
    });

    // Sales & Investor Relations
    this.departments.set('sales', {
      type: 'sales',
      name: 'Sales & Investor Relations',
      description: 'Fundraising, investor updates, grants, partnerships',
      lead: 'taylor',
      agents: ['taylor', 'jordan', 'casey'],
      capabilities: ['fundraising', 'investor_relations', 'grant_writing', 'partnerships', 'deck_creation'],
      queue: [],
      metrics: { tasksCompleted: 0, avgResponseTime: 0, satisfaction: 88 }
    });

    // Strategy & Business Development
    this.departments.set('strategy', {
      type: 'strategy',
      name: 'Strategy & BD',
      description: 'Market analysis, competitive intelligence, M&A, strategy',
      lead: 'alex',
      agents: ['alex', 'jordan', 'riley'],
      capabilities: ['market_analysis', 'competitive_intel', 'm_and_a', 'strategy_planning'],
      queue: [],
      metrics: { tasksCompleted: 0, avgResponseTime: 0, satisfaction: 93 }
    });

    // Legal & Compliance
    this.departments.set('legal', {
      type: 'legal',
      name: 'Legal & Compliance',
      description: 'Patents, contracts, compliance, regulatory',
      lead: 'iris',
      agents: ['iris'],
      capabilities: ['patents', 'contracts', 'compliance', 'regulatory', 'ip_protection'],
      queue: [],
      metrics: { tasksCompleted: 0, avgResponseTime: 0, satisfaction: 97 }
    });

    // Engineering
    this.departments.set('engineering', {
      type: 'engineering',
      name: 'Software Engineering',
      description: 'Development, DevOps, infrastructure, security',
      lead: 'maya',
      agents: ['maya', 'drew', 'theo'],
      capabilities: ['development', 'devops', 'infrastructure', 'security', 'testing'],
      queue: [],
      metrics: { tasksCompleted: 0, avgResponseTime: 0, satisfaction: 91 }
    });

    // Operations
    this.departments.set('operations', {
      type: 'operations',
      name: 'Operations & Finance',
      description: 'Finance, HR, admin, day-to-day operations',
      lead: 'raj',
      agents: ['raj', 'morgan'],
      capabilities: ['finance', 'hr', 'admin', 'procurement', 'reporting'],
      queue: [],
      metrics: { tasksCompleted: 0, avgResponseTime: 0, satisfaction: 89 }
    });

    // Marketing
    this.departments.set('marketing', {
      type: 'marketing',
      name: 'Marketing & Communications',
      description: 'Content, PR, social, brand, communications',
      lead: 'riley',
      agents: ['riley', 'jordan'],
      capabilities: ['content_creation', 'pr', 'social_media', 'brand', 'communications'],
      queue: [],
      metrics: { tasksCompleted: 0, avgResponseTime: 0, satisfaction: 87 }
    });
  }

  private setupEventListeners(): void {
    // Listen for department routing events from Risk Scorer
    eventBus.subscribe(EventTypes.DEPARTMENT_ROUTED, (payload: any) => {
      this.routeToDepartment(payload.department, payload.event, payload.assessment);
    });
  }

  // Route task to specific department
  routeToDepartment(
    deptType: DepartmentType | string,
    event: any,
    assessment?: any
  ): string | null {
    const dept = this.departments.get(deptType as DepartmentType);
    if (!dept) return null;

    const task: DepartmentTask = {
      id: `TASK-${++this.taskCounter}`,
      type: event.type || 'generic',
      source: event.source || 'system',
      content: event.content || JSON.stringify(event),
      priority: this.inferPriority(event, assessment),
      assignedTo: null,
      status: 'queued',
      createdAt: new Date().toISOString(),
      deadline: event.metadata?.deadline,
      context: { event, assessment }
    };

    dept.queue.push(task);

    // Auto-assign to least busy agent
    this.assignTask(dept, task);

    this.emit('taskRouted', { department: deptType, task });

    return task.id;
  }

  // Smart assignment within department
  private assignTask(dept: Department, task: DepartmentTask): void {
    // Find agent with fewest active tasks
    const agentLoads = dept.agents.map(agentId => ({
      id: agentId,
      load: dept.queue.filter(t => t.assignedTo === agentId && t.status === 'in_progress').length
    }));

    const leastBusy = agentLoads.sort((a, b) => a.load - b.load)[0];
    
    if (leastBusy) {
      task.assignedTo = leastBusy.id;
      task.status = 'assigned';
    }

    // If high priority, notify immediately
    if (task.priority === 'p0') {
      eventBus.publish(EventTypes.PRIORITY_TASK_ASSIGNED, {
        agent: task.assignedTo,
        task,
        department: dept.type
      });
    }
  }

  // Infer priority from event/assessment
  private inferPriority(event: any, assessment?: any): DepartmentTask['priority'] {
    if (event.metadata?.deadline) {
      const days = this.daysUntil(event.metadata.deadline);
      if (days < 3) return 'p0';
      if (days < 7) return 'p1';
    }

    if (assessment?.category === 'critical') return 'p0';
    if (assessment?.category === 'high') return 'p1';
    if (event.type?.includes('urgent')) return 'p0';
    if (event.type?.includes('grant') || event.type?.includes('investor')) return 'p1';

    return 'p2';
  }

  // Get department status
  getDepartment(type: DepartmentType): Department | null {
    return this.departments.get(type) || null;
  }

  // Get all departments
  getAllDepartments(): Department[] {
    return Array.from(this.departments.values());
  }

  // Get workload across all departments
  getWorkload(): Array<{ dept: string; queued: number; active: number; blocked: number }> {
    return Array.from(this.departments.entries()).map(([type, dept]) => ({
      dept: dept.name,
      queued: dept.queue.filter(t => t.status === 'queued').length,
      active: dept.queue.filter(t => t.status === 'in_progress').length,
      blocked: dept.queue.filter(t => t.status === 'blocked').length
    }));
  }

  // Mark task status
  updateTaskStatus(taskId: string, status: DepartmentTask['status']): boolean {
    for (const dept of this.departments.values()) {
      const task = dept.queue.find(t => t.id === taskId);
      if (task) {
        task.status = status;
        
        if (status === 'completed') {
          dept.metrics.tasksCompleted++;
        }

        this.emit('taskUpdated', { taskId, status, department: dept.type });
        return true;
      }
    }
    return false;
  }

  // Helper: Days until date
  private daysUntil(dateStr: string): number {
    const target = new Date(dateStr);
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}

export const departmentRouter = new DepartmentRouter();
