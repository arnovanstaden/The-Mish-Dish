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
    console.log(e.data)
    const notification = {
        title: "New Recipes",
        text: "You will be notified when new recipes are added to The Mish Dish!",
    }
    e.waitUntil(
        displayNotification(notification)
    );
});

self.addEventListener('notificationclick', function (e) {
    const notification = e.notification;
    const primaryKey = notification.data.primaryKey;
    const action = e.action;

    // if (action === 'close') {
    //     notification.close();
    // } else {
    //     console.log("opening new recipe")
    //     clients.openWindow('http://www.example.com');
    //     notification.close();
    // }
});

function displayNotification(notification) {
    const options = {
        body: notification.text,
        badge: '/images/favicon.png',
        icon: '/images/icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
    };

    notification.action ? options[actions] === notification.action : null;
    self.registration.showNotification(notification.title, options)
}