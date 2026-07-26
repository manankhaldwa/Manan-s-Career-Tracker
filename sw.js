/* Career Track — service worker.
   Cache-first for the shell so the app opens instantly and works offline.
   Bump CACHE when you change index.html, otherwise the old copy keeps being served. */
const CACHE = "ct-v4";

/* CORE must exist or offline mode is pointless — a failure here should fail loudly. */
const CORE = ["./", "./index.html"];

/* OPTIONAL is cached best-effort. cache.addAll() rejects atomically, so one missing
   icon used to kill the whole install and silently disable offline support. */
const OPTIONAL = ["./manifest.json", "./icons/icon-192.png", "./icons/icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      c.addAll(CORE).then(() =>
        Promise.all(OPTIONAL.map(u =>
          c.add(u).catch(err => console.warn("[sw] skipped " + u, err))
        ))
      )
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;

  e.respondWith(
    caches.match(req).then(hit => {
      if (hit) {
        // Refresh in the background so the next open is current.
        fetch(req).then(res => {
          if (res && res.ok) caches.open(CACHE).then(c => c.put(req, res.clone()));
        }).catch(() => {});
        return hit;
      }
      return fetch(req)
        .then(res => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});
