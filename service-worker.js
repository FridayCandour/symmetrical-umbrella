// This is the "Offline copy of pages" service worker

const CACHE_VERSION = 1;
const CACHES = {
  prefetch: "Admin-cube-prefetch-cache-v" + CACHE_VERSION,
};
const urlsToPrefetch = ["/", "/index.js"];

self.addEventListener("install", function (event) {
  const now = Date.now();

  event.waitUntil(
    caches
      .open(CACHES.prefetch)
      .then(async function (cache) {
        const cachePromises = urlsToPrefetch.map(async function (
          urlToPrefetch
        ) {
          const url = new URL(urlToPrefetch, location.href);
          url.search += (url.search ? "&" : "?") + "cache-bust=" + now;
          const request = new Request(url, { mode: "no-cors" });
          try {
            const response = await fetch(request);
            if (response.status >= 400) {
              throw new Error(
                "request for " +
                  urlToPrefetch +
                  " failed with status " +
                  response.statusText
              );
            }
            return await cache.put(urlToPrefetch, response);
          } catch (error) {
            console.error("Not caching " + urlToPrefetch + " due to " + error);
          }
        });

        await Promise.all(cachePromises);
        console.log("Pre-fetching complete.");
      })
      .catch(function (error) {
        console.error("Pre-fetching failed:", error);
      })
  );
});

self.addEventListener("activate", async function (e) {
  e.waitUntil(
    caches.keys().then((cach) => {
      if (cach !== CACHES.prefetch) {
        return caches.delete(cach);
      }
    })
  );
  return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const updateCache = async (request) => {
    const cache = await caches.open(CACHES.prefetch);
    const response = await fetch(request);
    return await cache.put(request, response);
  };

  event.waitUntil(updateCache(event.request));

  event.respondWith(
    fetch(event.request).catch(async (_error) => {
      const cache = await caches.open(CACHES.prefetch);
      const matching = await cache.match(event.request);
      const report =
        !matching || matching.status === 404
          ? Promise.reject("no-match")
          : matching;
      return report;
    })
  );
});
