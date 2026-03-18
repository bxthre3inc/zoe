import { memory } from '../memory/store.js';

export interface Project {
  id: string;
  name: string;
  parentEntityId: string;
  status: 'active' | 'paused' | 'complete';
  grants: string[];
  milestones: Milestone[];
  deadline?: string;
}

export interface Milestone {
  id: string;
  name: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'complete';
}

export class ProjectManager {
  private projects: Map<string, Project> = new Map();

  create(project: Project): void {
    this.projects.set(project.id, project);
    memory.add({
      id: `project-created-${project.id}`,
      content: JSON.stringify(project),
      type: 'project',
      timestamp: new Date().toISOString(),
      agent: 'system'
    });
  }

  get(id: string): Project | undefined {
    return this.projects.get(id);
  }

  listByEntity(entityId: string): Project[] {
    return Array.from(this.projects.values())
      .filter(p => p.parentEntityId === entityId);
  }

  getCriticalPath(): Project[] {
    return Array.from(this.projects.values())
      .filter(p => p.status === 'active')
      .sort((a, b) => {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      });
  }
}

export const projectManager = new ProjectManager();
