const CACHE = 'dnd35-v4';
const APP_BASE = new URL(self.location.href).pathname.replace(/sw\.js$/, '');
const PRECACHE_URLS = [
    APP_BASE,
    `${APP_BASE}index.html`,
    `${APP_BASE}manifest.json`,
    `${APP_BASE}icon.svg`,
    `${APP_BASE}campaign-library/demo-campana-greyhaven.json`,
    `${APP_BASE}campaign-library/demo-campana-valle-colmillos-blancos.json`,
    `${APP_BASE}campaign-library/demo-campana-ruta-sal-hierro.json`,
    `${APP_BASE}campaign-library/demo-campana-puentes-quebrados.json`,
    `${APP_BASE}campaign-library/demo-campana-bosque-tres-lunas.json`,
    `${APP_BASE}campaign-library/demo-campana-archivo-nombres-muertos.json`,
    `${APP_BASE}campaign-library/demo-campana-thornwatch.json`,
    `${APP_BASE}adventure/diente-dragon/world.js`,
    `${APP_BASE}adventure/diente-dragon/act1.js`,
    `${APP_BASE}adventure/diente-dragon/manifest.json`
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE).then(cache => cache.addAll(PRECACHE_URLS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    const { request } = event;
    if (request.method !== 'GET') return;

    event.respondWith(
        fetch(request).then(response => {
            if (response && response.ok) {
                const responseClone = response.clone();
                caches.open(CACHE).then(cache => cache.put(request, responseClone)).catch(() => {});
            }
            return response;
        }).catch(() => caches.match(request))
    );
});
