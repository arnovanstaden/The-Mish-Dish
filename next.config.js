const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache');


module.exports = withPWA({
    pwa: {
        disable: process.env.NEXT_PUBLIC_ENVIRONMENT === 'development',
        dest: 'public',
        runtimeCaching,
        register: true,
        scope: '/',
        sw: 'service-worker.js'
    },
    images: {
        domains: ['res.cloudinary.com'],
    },
})