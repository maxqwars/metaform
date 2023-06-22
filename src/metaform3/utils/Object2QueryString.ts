/**
 * Trnsform object to URL query string
 *
 * @export
 * @param {{ [key: string]: unknown }} obj Source object
 * @return {*}  {string}
 */
export function Object2QueryString(obj: { [key: string]: unknown }): string {
  return Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join("&");
}
