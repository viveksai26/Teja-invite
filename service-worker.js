/* ===== Modern Service Worker ===== */

const VERSION = 'v20260105.1457'; // bump on every deploy
const CACHE_NAME = `app-cache-${VERSION}`;

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/style.css',
  '/js/myscripts.js'
  // add more if needed
];

/* INSTALL */
self.addEventListener('install', event => {
  console.log('[SW] Install');

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );

  self.skipWaiting();
});

/* ACTIVATE */
self.addEventListener('activate', event => {
  console.log('[SW] Activate');

  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

/* FETCH (network-first for HTML, cache-first for assets) */
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const request = event.request;

  // HTML → network first
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Assets → cache first
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        return response;
      });
    })
  );
});

/* PUSH NOTIFICATIONS */
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};

  const title = data.title || 'New notification';
  const options = {
    body: data.body || '',
    icon: '/icons/icon-192.png',
    badge: '/icons/badge.png',
    data: data.url || '/',
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

/* NOTIFICATION CLICK */
self.addEventListener('notificationclick', event => {
  event.notification.close();

  event.waitUntil(
    self.clients.openWindow(event.notification.data)
  );
});
