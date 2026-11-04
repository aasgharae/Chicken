const C = 'poultry-v1';
self.addEventListener('install', e => {
  e.waitUntil(caches.open(C).then(c => c.addAll(['./', 'index.html', 'manifest.json'])));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))));
});
// اول اینترنت، اگه نبود از کش (آفلاین هم کار کنه)
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(n => { const cp = n.clone(); caches.open(C).then(c => c.put(e.request, cp)); return n; })
      .catch(() => caches.match(e.request))
  );
});
