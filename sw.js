/* [M-21] Harakiri worker: replaces every previously installed SW, deletes all
   caches and unregisters itself so the app always loads fresh from network. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    } catch (e) { /* ignore */ }
    try { await self.clients.claim(); } catch (e) { /* ignore */ }
    try { await self.registration.unregister(); } catch (e) { /* ignore */ }
  })());
});
self.addEventListener('fetch', () => { /* never intercept */ });
