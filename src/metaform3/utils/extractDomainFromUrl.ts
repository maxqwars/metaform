function extractHostname(url: string): string {
  let hostname: string;

  if (url.indexOf("//") > -1) hostname = url.split("/")[2];
  else hostname = url.split("/")[0];

  hostname = hostname.split(":")[0];
  hostname = hostname.split("?")[0];

  return hostname;
}

export function extractDomainFromUrl(url: string): string {
  let domain = extractHostname(url);
  const splitArr = domain.split(".");
  const arrLen = splitArr.length;

  if (arrLen > 2) {
    domain = `${splitArr[arrLen - 2]}.${splitArr[arrLen - 1]}`;
    if (
      splitArr[arrLen - 2].length === 2 &&
      splitArr[arrLen - 1].length === 2
    ) {
      domain = `${splitArr[arrLen - 3]}.${domain}`;
    }
  }
  return domain;
}
