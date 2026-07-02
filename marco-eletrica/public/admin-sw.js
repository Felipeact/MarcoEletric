self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// O painel sempre precisa de dados ao vivo do banco; usamos apenas
// network-first com fallback ao cache para permitir a instalação como
// app, sem arriscar servir dados desatualizados quando online.
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request)),
  );
});
