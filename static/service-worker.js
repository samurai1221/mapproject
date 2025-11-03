const CACHE_NAME = 'mapproject-cache-v1';
const urlsToCache = [
  '/',
  '/static/manifest.json',
  '/static/icons/icon-192x192.png',
  '/static/icons/icon-512x512.png',
];

// Установка service worker
self.addEventListener('install', (event) => {
  console.log('[SW] Устанавливается Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Кэшируем ресурсы');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[SW] Все ресурсы закэшированы');
      })
  );
});

// Активация service worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Активирован Service Worker');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

// Обработка запросов
self.addEventListener('fetch', (event) => {
  // Пытаемся ответить из кэша, если нет — из сети
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          console.log('[SW] Из кэша:', event.request.url);
          return response;
        }
        console.log('[SW] Из сети:', event.request.url);
        return fetch(event.request);
      })
      .catch((err) => {
        console.warn('[SW] Ошибка загрузки:', err);
      })
  );
});

// Установка приложения (опционально)
self.addEventListener('beforeinstallprompt', (e) => {
  console.log('[SW] beforeinstallprompt triggered');
});
