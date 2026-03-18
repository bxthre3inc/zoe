import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { Employee, Manager, Executive, OrgChart, EmployeeRole, Department } from './types.js';

const ORG_DIR = '/data/agentos/org';
const CHART_FILE = `${ORG_DIR}/chart.json`;

if (!existsSync(ORG_DIR)) mkdirSync(ORG_DIR, { recursive: true });

class Organization {
  private chart: OrgChart = {
    employees: new Map(),
    root: 'brodiblanco'
  };

  constructor() {
    this.initializeDefault();
    this.save();
  }

  private initializeDefault(): void {
    // Executive
    const brodiblanco: Executive = {
      id: 'brodiblanco',
      name: 'brodiblanco',
      role: 'executive',
      department: 'engineering',
      managerId: null,
      colleagues: [],
      shifts: ['continuous'],
      skills: ['strategy', 'vision', 'execution'],
      tools: ['zo', 'terminal', 'all'],
      status: 'working',
      inboxPath: '/data/agentos/inbox/brodiblanco',
      outboxPath: '/data/agentos/outbox/brodiblanco',
      statusPath: '/data/agentos/status/brodiblanco',
      manages: ['engineering', 'operations', 'investor_relations']
    };
    this.chart.employees.set(brodiblanco.id, brodiblanco);

    // Managers
    const taylor: Manager = {
      id: 'taylor',
      name: 'Taylor Chen',
      role: 'manager',
      department: 'investor_relations',
      managerId: 'brodiblanco',
      colleagues: ['casey', 'maya'],
      shifts: ['morning', 'afternoon'],
      skills: ['investor_comms', 'fundraising', 'deals'],
      tools: ['gmail', 'calendar', 'crm'],
      status: 'working',
      inboxPath: '/data/agentos/inbox/taylor',
      outboxPath: '/data/agentos/outbox/taylor',
      statusPath: '/data/agentos/status/taylor',
      directReports: ['jordan-fund', 'sam', 'alex'],
      escalationClockHours: 24,
      peerHelpThreshold: 22,
      sprintModeActive: false
    };
    this.chart.employees.set(taylor.id, taylor);

    // More managers
    const maya: Manager = {
      id: 'maya',
      name: 'Maya Patel',
      role: 'manager',
      department: 'engineering',
      managerId: 'brodiblanco',
      colleagues: ['taylor', 'casey'],
      shifts: ['morning', 'afternoon'],
      skills: ['architecture', 'code_review', 'leadership'],
      tools: ['github', 'vscode', 'terminal'],
      status: 'working',
      inboxPath: '/data/agentos/inbox/maya',
      outboxPath: '/data/agentos/outbox/maya',
      statusPath: '/data/agentos/status/maya',
      directReports: ['iris', 'drew', 'theo'],
      escalationClockHours: 24,
      peerHelpThreshold: 22,
      sprintModeActive: false
    };
    this.chart.employees.set(maya.id, maya);

    // Employees
    const jordanFund: Employee = {
      id: 'jordan-fund',
      name: 'Jordan Reyes',
      role: 'employee',
      department: 'investor_relations',
      managerId: 'taylor',
      colleagues: ['sam', 'alex'],
      shifts: ['morning'],
      skills: ['outreach', 'pitch_decks'],
      tools: ['gmail', 'slides'],
      status: 'idle',
      inboxPath: '/data/agentos/inbox/jordan-fund',
      outboxPath: '/data/agentos/outbox/jordan-fund',
      statusPath: '/data/agentos/status/jordan-fund'
    };
    this.chart.employees.set(jordanFund.id, jordanFund);
  }

  addEmployee(emp: Employee | Manager | Executive): void {
    this.chart.employees.set(emp.id, emp);
    this.save();
  }

  getEmployee(id: string): Employee | Manager | Executive | undefined {
    return this.chart.employees.get(id);
  }

  getDirectReports(managerId: string): Employee[] {
    const manager = this.chart.employees.get(managerId);
    if (!manager || manager.role !== 'manager') return [];
    return Array.from(this.chart.employees.values())
      .filter(e => e.managerId === managerId);
  }

  listAll(): (Employee | Manager | Executive)[] {
    return Array.from(this.chart.employees.values());
  }

  getTeammates(empId: string): string[] {
    const emp = this.chart.employees.get(empId);
    if (!emp) return [];
    return emp.colleagues;
  }

  private save(): void {
    const empObj: Record<string, any> = {};
    for (const [id, emp] of this.chart.employees) {
      empObj[id] = emp;
    }
    writeFileSync(CHART_FILE, JSON.stringify({ root: this.chart.root, employees: empObj }, null, 2));
  }
}

export const org = new Organization();
