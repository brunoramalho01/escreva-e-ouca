const CACHE = 'escreva-ouca-v1';
// Usa caminhos relativos para funcionar tanto em GitHub Pages quanto local
const ARQUIVOS = [
  './escreva-e-ouca.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ARQUIVOS))
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
  // Requisições à API Gemini sempre vão direto para a rede
  if (e.request.url.includes('generativelanguage.googleapis.com') ||
      e.request.url.includes('esm.run') ||
      e.request.url.includes('fonts.googleapis.com')) {
    e.respondWith(fetch(e.request));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
