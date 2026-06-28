// Sky Calendar Volvelle — service worker for offline use.
// Caches the app shell on first load so it works with no network afterward.
const CACHE = 'volvelle-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  // Local libraries if present (these will simply fail-soft if not uploaded):
  './p5.min.js',
  './astronomy.browser.min.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) =>
      // addAll fails if any file is missing; add individually and ignore misses
      Promise.allSettled(ASSETS.map((url) => cache.add(url)))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Cache-first for app assets; fall back to network (and cache CDN libs on the fly).
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((hit) => {
      if (hit) return hit;
      return fetch(e.request).then((res) => {
        // Cache successful CDN library fetches so offline works next time
        if (res.ok && (e.request.url.includes('cdnjs') || e.request.url.includes('jsdelivr'))) {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, clone));
        }
        return res;
      }).catch(() => hit);
    })
  );
});
