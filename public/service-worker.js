let CACHE_NAME = "static-cache";
let urlsToCache = [
    "."
]


self.addEventListener("install", function (event) {
    console.log("Hello world from the Service Worker 🤙");

    // Offline

});

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    )
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        fetch(event.request).catch(function () {
            return caches.match(event.request);
        })
    );
});