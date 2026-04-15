const CACHE = 'dnd35-v3';

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE).then(cache => cache.addAll([
            '/dnd35-sheet/',
            '/dnd35-sheet/index.html',
            '/dnd35-sheet/manifest.json',
            '/dnd35-sheet/icon.svg',
            '/dnd35-sheet/campaign-library/demo-campana-greyhaven.json',
            '/dnd35-sheet/campaign-library/demo-campana-valle-colmillos-blancos.json',
            '/dnd35-sheet/campaign-library/demo-campana-ruta-sal-hierro.json',
            '/dnd35-sheet/campaign-library/demo-campana-puentes-quebrados.json',
            '/dnd35-sheet/campaign-library/demo-campana-bosque-tres-lunas.json',
            '/dnd35-sheet/campaign-library/demo-campana-archivo-nombres-muertos.json',
            '/dnd35-sheet/campaign-library/demo-campana-thornwatch.json'
        ]))
    );
    self.skipWaiting();
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(cached => cached || fetch(e.request))
    );
});
