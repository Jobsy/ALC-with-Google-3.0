
const cacheName = "v1";
const cacheFiles = [
    "./",
    "/index.html",
  "./main.js",
  "./main.css",
  "https://free.currencyconverterapi.com/api/v5/currencies?q=",
  "https://free.currencyconverterapi.com/api/v5/convert?="
];
function touchstarte(e) {
    document.addEventListener('touchstart', onTouchStart, {passive: true});
}

self.addEventListener('install', e => {
    console.log("[ServiceWorker] installed")

    e.waitUntil(caches.open(cacheName).then(cache => {
        console.log("[ServiceWorker] caching cacheFiles")
        return cache.addAll(cacheFiles);
    }))
})


self.addEventListener('activate', e => {
    console.log("[ServiceWorker] activated")

    e.waitUntil(caches.keys().then(cacheNames => {
        return Promise.all(cacheNames.map(thisCacheName => {
            if (thisCacheName !== cacheName) {
                console.log("[ServiceWorker] old cache removed", thisCacheName)
                return caches.delete(thisCacheName);
            }
        }))
    }))
})


self.addEventListener('fetch', e => {
    console.log("[ServiceWorker] fetching", e.request.url)

    const requestUrl = new URL(event.request.url);

    if (requestUrl.origin === location.origin) {
      if (requestUrl.pathname === '/') {
        event.respondWith(caches.match('./'));
        return;
      }} 

    e.respondWith(caches.match(e.request).then(response => {
        if(response) {
            console.log("[ServiceWorker] Found in cache", e.request.url);
            return response;
        }

        const requestClone = e.request.clone();
        fetch(requestClone)
        .then(response => {
            if (!response) {
                console.log("[ServiceWorker] No response from fetch");
                return response;
            }
            const requestClone = e.request.clone();
            caches.open(cacheName).then(cache => {
                cache.put(e.request, responseClone);
                return response;
            });
                
        })
        .catch(err => {
            console.log("[ServiceWorker] Error Fetching & Caching New Fetech")
        })

    }))
})
