export function getUrl(url) {
  let tmp = url.split('/');
  tmp.pop();

  return tmp.join('/');
}
