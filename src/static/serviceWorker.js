const CACHE = true;
const CACHE_NAME = "backTracker_0";
const CACHE_WHITELIST = [CACHE_NAME];

// Delete old caches that are not our current one!
self.addEventListener("activate", event =>
  event.waitUntil(
    caches
      .keys()
      .then(keyList =>
        Promise.all(
          keyList.map(
            key =>
              !CACHE_WHITELIST.includes(key)
                ? caches.delete(key)
                : Promise.resolve()
          )
        )
      )
  )
);

self.addEventListener("install", event => {
  if (!CACHE) return;

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache =>
        cache.addAll([
          "/",
          "/main.css",
          "/initServiceWorker.js",
          "/BackTracker.js",
          "/icon@4x.png",
          "/icon@2x.png",
          "/icon.png"
        ])
      )
  );
});

self.addEventListener("fetch", event => {
  if (!CACHE) return;

  event.respondWith(
    caches
      .match(event.request)
      .then(response => response || fetch(event.request))
  );
});
