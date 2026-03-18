import { org } from '../core/hierarchy/org';

describe('Organization Hierarchy', () => {
  test('brodiblanco is CEO', () => {
    const ceo = org.getEmployee('brodiblanco');
    expect(ceo).toBeDefined();
    expect(ceo?.role).toBe('executive');
  });

  test('has 20 employees total', () => {
    const all = org.listAll();
    expect(all).toHaveLength(20);
  });

  test('taylor has 3 direct reports', () => {
    const taylor = org.getEmployee('taylor');
    expect(taylor?.directReports).toHaveLength(3);
  });
});
