/* eslint-disable no-undef */
workbox.precaching.precacheAndRoute(self.__precacheManifest);
workbox.core.skipWaiting();
workbox.core.clientsClaim();
workbox.routing.setDefaultHandler(new workbox.strategies.StaleWhileRevalidate());