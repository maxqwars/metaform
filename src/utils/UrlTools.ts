// Copyright (c) 2022 Maxim "maxqwars" Maximenko <maxqwars@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export default class UrlTools {
  /**
   * Extract hostname from url
   * - https://apiservice.com/ -> apiservice.com
   * - https://api.apiservice.com/ -> api.apiservice.com
   * - https://api.apiservice.com/method?limit=10 -> api.apiservice.com
   *
   * @static
   * @param {string} url URL address
   * @return {string} hostname from url
   * @memberof UrlTools
   */
  public static extractHostname(url: string): string {
    let hostname: string;

    if (url.indexOf('//') > -1) {
      hostname = url.split('/')[2];
    } else {
      hostname = url.split('/')[0];
    }

    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];

    return hostname;
  }

  /**
   * Extract domain from url
   *
   * - https://apiservice.com/ -> apiservice.com
   * - https://api.apiservice.com/ -> apiservice.com
   * - https://api.apiservice.com/method?limit=10 -> apiservice.com
   *
   * @static
   * @param {string} url URL address
   * @return {string} root domain from url
   * @memberof UrlTools
   */
  public static extractRootDomain(url: string): string {
    let domain = this.extractHostname(url);
    const splitArr = domain.split('.');
    const arrLen = splitArr.length;

    if (arrLen > 2) {
      domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
      if (
        splitArr[arrLen - 2].length == 2 &&
        splitArr[arrLen - 1].length == 2
      ) {
        domain = splitArr[arrLen - 3] + '.' + domain;
      }
    }
    return domain;
  }
}
