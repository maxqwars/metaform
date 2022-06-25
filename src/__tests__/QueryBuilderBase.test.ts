import QueryBuilderBase from '../core/QueryBuilderBase';

// eslint-disable-next-line no-unused-vars
class TestQueryBuilder extends QueryBuilderBase {
  get params(): { [key: string]: unknown } {
    return super.params;
  }

  // ? Make public
  isNum = super.isNumber;
  isArr = super.isArray;
  isStr = super.isString;
  isBool = super.isBool;
  isObj = super.isObj;

  addNumParam(num: any): TestQueryBuilder {
    if (super.isNumber(num)) super.addParam('numQueryParam', num as number);
    return this;
  }

  addStrParam(str: any): TestQueryBuilder {
    if (super.isString(str)) super.addParam('strQueryParam', str as string);
    return this;
  }

  addBoolParam(bool: any): TestQueryBuilder {
    if (super.isBool(bool)) super.addParam('boolQueryParam', bool as boolean);
    return this;
  }

  addObjectParam(obj: any): TestQueryBuilder {
    if (super.isObj(obj)) super.addParam('objectQueryParam', obj as Object);
    return this;
  }

  addArrParam(arr: any): TestQueryBuilder {
    if (super.isArray(arr)) super.addParam('arrQueryParam', arr as Array<any>);
    return this;
  }
}

const queryBuilder = new TestQueryBuilder();

describe('TypeGuards', () => {
  test('isNumber()', () => {
    // Int + Float
    expect(queryBuilder.isNum(0)).toBe(true);
    expect(queryBuilder.isNum(12.1)).toBe(true);

    // Strings
    expect(queryBuilder.isNum('12.1')).toBe(false);
    expect(queryBuilder.isNum('123')).toBe(false);
    expect(queryBuilder.isNum('string value')).toBe(false);
    expect(queryBuilder.isNum('')).toBe(false);

    // Arrays and Objects
    expect(queryBuilder.isNum([])).toBe(false);
    expect(queryBuilder.isNum({})).toBe(false);

    // Etc
    expect(queryBuilder.isNum(false)).toBe(false);
    expect(queryBuilder.isNum(NaN)).toBe(false);
    expect(queryBuilder.isNum(null)).toBe(false);
    expect(queryBuilder.isNum(undefined)).toBe(false);
  });

  test('isString()', () => {
    // Int + Float
    expect(queryBuilder.isStr(0)).toBe(false);
    expect(queryBuilder.isStr(12.1)).toBe(false);

    // Strings
    expect(queryBuilder.isStr('12.1')).toBe(true);
    expect(queryBuilder.isStr('123')).toBe(true);
    expect(queryBuilder.isStr('string value')).toBe(true);
    expect(queryBuilder.isStr('')).toBe(true);

    // Arrays and Objects
    expect(queryBuilder.isStr([])).toBe(false);
    expect(queryBuilder.isStr({})).toBe(false);

    // Etc
    expect(queryBuilder.isStr(false)).toBe(false);
    expect(queryBuilder.isStr(NaN)).toBe(false);
    expect(queryBuilder.isStr(null)).toBe(false);
    expect(queryBuilder.isStr(undefined)).toBe(false);
  });

  test('isArray()', () => {
    // Int + Float
    expect(queryBuilder.isArr(0)).toBe(false);
    expect(queryBuilder.isArr(12.1)).toBe(false);

    // Strings
    expect(queryBuilder.isArr('12.1')).toBe(false);
    expect(queryBuilder.isArr('123')).toBe(false);
    expect(queryBuilder.isArr('string value')).toBe(false);
    expect(queryBuilder.isArr('')).toBe(false);

    // Arrays and Objects
    expect(queryBuilder.isArr([])).toBe(true);
    expect(queryBuilder.isArr({})).toBe(false);

    // Etc
    expect(queryBuilder.isArr(false)).toBe(false);
    expect(queryBuilder.isArr(NaN)).toBe(false);
    expect(queryBuilder.isArr(null)).toBe(false);
    expect(queryBuilder.isArr(undefined)).toBe(false);
  });
});
