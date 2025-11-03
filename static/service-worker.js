// === [1] Логирование в Render через Django API ===
function logToServer(level, message) {
  fetch(`/sw-log/?level=${level}&msg=${encodeURIComponent(message)}`)
    .catch(() => {}); // если оффлайн — не падаем
}

function log(message) {
  console.log('[SW]', message);
  logToServer('info', message);
}

function warn(message) {
  console.warn('[SW]', message);
  logToServer('warn', message);
}

function error(message) {
  console.error('[SW]', message);
  logToServer('error', message);
}

// === [2] Название кэша и ресурсы ===
const CACHE_NAME = 'mapproject-cache-v1';
const urlsToCache = [
  '/',
  '/static/manifest.json',
  '/static/icons/icon-192x192.png',
];

// === [3] Установка Service Worker ===
self.addEventListener('install', (event) => {
  log('Устанавливается Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        log('Кэшируем ресурсы...');
        return cache.addAll(urlsToCache);
      })
      .then(() => log('Service Worker установлен и кэш готов'))
      .catch((err) => error('Ошибка кэширования: ' + err))
  );
});

// === [4] Активация ===
self.addEventListener('activate', (event) => {
  log('Активирован Service Worker');
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names.filter((name) => name !== CACHE_NAME)
             .map((name) => caches.delete(name))
      );
    })
  );
});

// === [5] Перехват запросов ===
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          log('Из кэша: ' + event.request.url);
          return response;
        }
        log('Из сети: ' + event.request.url);
        return fetch(event.request);
      })
      .catch((err) => error('Ошибка при fetch: ' + err))
  );
});
