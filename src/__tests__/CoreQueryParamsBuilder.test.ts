import CoreQueryParamsBuilder from '../core/CoreQueryParamsBuilder';

class TestQueryParamsBuilder extends CoreQueryParamsBuilder {
  get buff() {
    return this.params;
  }

  addId(id: number) {
    this.addParameter('id', id);
  }
}

const tqpb = new TestQueryParamsBuilder();

describe('Required methods to be defined', () => {
  test('CoreQueryParamsBuilder.build', () => {
    expect(CoreQueryParamsBuilder.prototype.build).toBeDefined();
  });
});

describe('CoreQueryBuilder.addParameter test collection', () => {
  test('Add param', () => {
    tqpb.addId(0);
    expect(tqpb.buff['id']).toBe(0);
  });
});
