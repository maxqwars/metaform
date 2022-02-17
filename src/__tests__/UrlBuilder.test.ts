import UrlBuilder from '../core/UrlBuilder';

const BASE_URL = 'api.server.com/v2';
const urlBuilder = new UrlBuilder(BASE_URL);

describe('Required methods to be defined', () => {
  test('UrlBuilder.setEndpoint', () => {
    expect(UrlBuilder.prototype.setEndpoint).toBeDefined();
    expect(typeof UrlBuilder.prototype.setEndpoint).toBe('function');
  });

  test('UrlBuilder.setQueryParams', () => {
    expect(UrlBuilder.prototype.setQueryParams).toBeDefined();
    expect(typeof UrlBuilder.prototype.setQueryParams).toBe('function');
  });

  test('UrlBuilder.build', () => {
    expect(UrlBuilder.prototype.build).toBeDefined();
    expect(typeof UrlBuilder.prototype.build).toBe('function');
  });
});

describe('UrlBuilder.setEndpoint test collection', () => {});
describe('UrlBuilder.setQueryParams test collection', () => {});
describe('UrlBuilder.build test collection', () => {});
