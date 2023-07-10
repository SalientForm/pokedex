export function getIdFromUrl(url: string) {
  const idIndex = url.lastIndexOf('/', url.lastIndexOf('/') - 1) + 1;
  return parseInt(url.substring(idIndex, url.length - 1) ?? 0);
}
