import UrlTools from '../utils/UrlTools';

/* Constants */
const DOMAIN = 'apiservice.com';
const SUBDOMAIN = 'api.apiservice.com';
const URL_WITH_DOMAIN_ONLY = 'https://apiservice.com/';
const URL_WITH_SUBDOMAIN = 'https://api.apiservice.com/';
const URL_WITH_QUERY_PARAMS = 'https://api.apiservice.com/method?limit=10';

describe('Required methods to be defined', () => {
  test('UrlTools.extractHostname to be defined', () => {
    expect(UrlTools.extractHostname).toBeDefined();
  });

  test('UrlTools.extractRootDomain to be defined', () => {
    expect(UrlTools.extractRootDomain).toBeDefined();
  });
});

describe('UrlTools.extractHostname tests collection', () => {
  test('Extract hostname from url with domain only', () => {
    expect(UrlTools.extractHostname(URL_WITH_DOMAIN_ONLY)).toBe(DOMAIN);
  });

  test('Extract hostname from url with subdomain', () => {
    expect(UrlTools.extractHostname(URL_WITH_SUBDOMAIN)).toBe(SUBDOMAIN);
  });

  test('Extract hostname from url with query params', () => {
    expect(UrlTools.extractHostname(URL_WITH_QUERY_PARAMS)).toBe(SUBDOMAIN);
  });
});

describe('UrlTools.extractRootDomain tests collection', () => {
  test('Extract root domain from url with domain only', () => {
    expect(UrlTools.extractRootDomain(URL_WITH_DOMAIN_ONLY)).toBe(DOMAIN);
  });

  test('Extract root domain from url with subdomain', () => {
    expect(UrlTools.extractRootDomain(URL_WITH_SUBDOMAIN)).toBe(DOMAIN);
  });

  test('Extract root domain from url with query params', () => {
    expect(UrlTools.extractRootDomain(URL_WITH_QUERY_PARAMS)).toBe(DOMAIN);
  });
});
