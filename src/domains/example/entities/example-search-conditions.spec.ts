import { ExampleSearchConditions } from './example-search-conditions';

describe(ExampleSearchConditions.name, () => {
  describe(ExampleSearchConditions.fromQuery.name, () => {
    it('メールアドレスと名前を指定せずに生成できる', () => {
      const cond = ExampleSearchConditions.fromQuery();
      expect(cond).toBeDefined();
      expect(cond.email).toBeUndefined();
      expect(cond.name).toBeUndefined();
    });

    it('メールアドレスと名前を指定して生成できる', () => {
      const cond = ExampleSearchConditions.fromQuery('test1', 'test2');
      expect(cond).toBeDefined();
      expect(cond.email).toBe('test1');
      expect(cond.name).toBe('test2');
    });
  });
});
