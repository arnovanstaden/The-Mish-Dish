'use strict'

module.exports = [
    {
        urlPattern: '/',
        // use NetworkFirst or NetworkOnly if you redirect un-authenticated user to login page
        handler: 'NetworkFirst',
        options: {
            // don't change cache name
            cacheName: 'start-url',
            expiration: {
                maxEntries: 1,
                maxAgeSeconds: 24 * 60 * 60 // 24 hours
            }
        }
    },
    {
        urlPattern: /\.(?:json|xml|csv)$/i,
        handler: 'NetworkFirst',
        options: {
            cacheName: 'static-data-assets',
            expiration: {
                maxEntries: 32,
                maxAgeSeconds: 24 * 60 * 60 // 24 hours
            }
        }
    },
    {
        urlPattern: /\/api\/.*$/i,
        handler: 'NetworkFirst',
        method: 'GET',
        options: {
            cacheName: 'apis',
            expiration: {
                maxEntries: 16,
                maxAgeSeconds: 24 * 60 * 60 // 24 hours
            },
            networkTimeoutSeconds: 10 // fall back to cache if api does not response within 10 seconds
        }
    },
    {
        urlPattern: /.*/i,
        handler: 'NetworkFirst',
        options: {
            cacheName: 'others',
            expiration: {
                maxEntries: 32,
                maxAgeSeconds: 24 * 60 * 60 // 24 hours
            },
            networkTimeoutSeconds: 10
        }
    },
    {
        urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
            cacheName: 'static-image-assets',
            expiration: {
                maxEntries: 64,
                maxAgeSeconds: 24 * 60 * 60 // 24 hours
            }
        }
    },
]