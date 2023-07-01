/**
 * Transform object to URL query string
 *
 * @export
 * @param {{ [key: string]: unknown }} obj Source object
 * @return {*}  {string}
 */
export function object2query(obj: { [key: string]: unknown }): string {
  return Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join("&");
}
