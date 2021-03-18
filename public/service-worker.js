let CACHE_NAME = "static-cache";
let urlsToCache = [
    "."
]


self.addEventListener("install", function (event) {

});

// Notifications

self.addEventListener('notificationclick', function (e) {
    const notification = e.notification;
    const primaryKey = notification.data.primaryKey;
    const action = e.action;

    if (action === 'close') {
        notification.close();
    } else {
        console.log("opening new recipe")
        clients.openWindow('http://www.example.com');
        notification.close();
    }
});

