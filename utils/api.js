// @flow

export function getApiUrl(path?: string) {
  const baseUrl =
    process.env.NODE_ENV !== 'production' ? 'http://localhost:4000' : '';

  return path ? `${baseUrl}${path}` : `${baseUrl}/`;
}
