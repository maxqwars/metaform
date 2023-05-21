export function Object2QueryString(obj: { [key: string]: unknown }): string {
  return Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join("&");
}
