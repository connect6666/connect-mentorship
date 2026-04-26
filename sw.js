const CACHE_NAME = "connect-v2";

const urlsToCache = [
  "/connect-mentorship/",
  "/connect-mentorship/index.html",
  "/connect-mentorship/style.css"
];

// INSTALL
self.addEventListener("install", (event) => {
  console.log("Service Worker Installed");
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ACTIVATE
self.addEventListener("activate", (event) => {
  console.log("Service Worker Activated");

  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );

  return self.clients.claim();
});

// FETCH (CACHE FIRST → FALLBACK NETWORK)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
