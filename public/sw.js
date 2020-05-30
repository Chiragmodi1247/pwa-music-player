self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open('song')
      .then(function(cache) {
        console.log('song cached')
        cache.add('/')
        cache.add('/index.html')
        cache.add('/Shayad.mp3')
      })
  )
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ...', event);
  return self.clients.claim();
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if(response)
          return response
        else
          return fetch(event.request)
      })
  )
});