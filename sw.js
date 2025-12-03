// sw.js - simple cache-first SW with offline fallback
const CACHE = 'fishing-cache-v1';
const ASSETS = ['/', '/index.html', '/styles.css', '/app.js', '/competitions.html', '/register.html', '/checkin.html', '/payment-sandbox.html', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(resp => {
      // cache new GET responses
      if (e.request.method === 'GET' && resp.ok) {
        const clone = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return resp;
    }).catch(()=>caches.match('/index.html')))
  );
});
