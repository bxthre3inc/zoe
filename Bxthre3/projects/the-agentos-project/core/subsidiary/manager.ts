import { Entity, WorkContext, CrossEntityMetrics, EntityType } from './types.js';

export class SubsidiaryManager {
  private entities: Map<string, Entity> = new Map();
  private activeContext: WorkContext | null = null;

  registerEntity(entity: Entity): void {
    this.entities.set(entity.id, entity);
  }

  getEntity(id: string): Entity | undefined {
    return this.entities.get(id);
  }

  listByType(type: EntityType): Entity[] {
    return Array.from(this.entities.values()).filter(e => e.type === type);
  }

  setWorkContext(context: WorkContext): void {
    this.activeContext = context;
  }

  getWorkContext(): WorkContext | null {
    return this.activeContext;
  }

  getMetrics(): CrossEntityMetrics {
    const entities = Array.from(this.entities.values());
    return {
      totalEmployees: entities.reduce((sum, e) => sum + e.employees.length, 0),
      activeProjects: this.countActiveProjects(),
      pendingGrants: this.countPendingGrants(),
      sharedCosts: this.calculateSharedCosts()
    };
  }

  private countActiveProjects(): number {
    return 0;
  }

  private countPendingGrants(): number {
    return 0;
  }

  private calculateSharedCosts(): Record<string, number> {
    return {};
  }
}

export const subsidiaryManager = new SubsidiaryManager();
