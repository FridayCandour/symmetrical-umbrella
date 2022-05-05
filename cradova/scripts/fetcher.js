/**
 * An fetch based fetcher
 * ----------------------
 *
 * @param url string
 * @param method string
 * @param headers object
 * @param data object
 * @returns any
 */

export default async function fetcher(url, method = "GET", headers, data) {
  try {
    const asis = await fetch(url, {
      headers,
      method,
      body: JSON.stringify(data),
    });
    return asis;
  } catch (error) {
    return {
      async text() {
        return {
          message: JSON.stringify(`${method} ${url} net::ERR_FAILED`),
        };
      },
    };
  }
}
