const CACHE_NAME = "connect-v1";

// Install
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch (network first)
self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
