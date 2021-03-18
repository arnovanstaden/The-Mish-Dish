let CACHE_NAME = 'my-cache';
let urlsToCache = [
    '.'
];

// Offline

self.addEventListener('install', function (event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
            )
    );
});

// Notifications

self.addEventListener('push', function (e) {
    const notification = JSON.parse(e.data.text());
    e.waitUntil(
        displayNotification(notification)
    );
});

function displayNotification(notification) {
    const options = {
        body: notification.text,
        badge: '/images/favicon.png',
        icon: '/images/icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: notification.primaryKey,
            url: notification.url
        }
    };

    notification.action ? options[actions] === notification.action : null;
    self.registration.showNotification(notification.title, options)
}


// New Recipes
self.addEventListener('notificationclick', function (e) {
    console.log(e)
    const notification = e.notification;
    const primaryKey = notification.data.primaryKey;
    const action = e.action;

    if (action === 'close') {
        notification.close();
    } else {
        if (primaryKey === 2) {
            clients.openWindow(notification.data.url);
        }
        notification.close();
    }
});