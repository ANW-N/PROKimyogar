
const APP_VERSION = "1.1.0";
const CACHE_NAME = `prokimyogar-${APP_VERSION}`;

const ASSETS_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./icon/logo.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) =>
            cache.addAll(ASSETS_TO_CACHE)
        )
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) =>
                Promise.all(
                    keys
                        .filter((key) =>
                            key.startsWith("prokimyogar-") &&
                            key !== CACHE_NAME
                        )
                        .map((key) => caches.delete(key))
                )
            )
            .then(() => self.clients.claim())
    );
});

self.addEventListener("message", (event) => {
    if (event.data?.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

self.addEventListener("fetch", (event) => {
    const request = event.request;

    if (request.method !== "GET") return;

    const url = new URL(request.url);

    if (url.origin !== self.location.origin) return;

    const scopePath = new URL(self.registration.scope).pathname;

    if (!url.pathname.startsWith(scopePath)) return;

    if (request.mode === "navigate") {
        event.respondWith(
            fetch(request)
                .then(async (response) => {
                    if (response.ok) {
                        const cache = await caches.open(CACHE_NAME);
                        await cache.put("./index.html", response.clone());
                    }

                    return response;
                })
                .catch(async () => {
                    return (
                        await caches.match(request) ||
                        await caches.match("./index.html") ||
                        Response.error()
                    );
                })
        );

        return;
    }

    event.respondWith(
        caches.match(request).then(async (cachedResponse) => {
            if (cachedResponse) return cachedResponse;

            const response = await fetch(request);

            if (response.ok && response.type === "basic") {
                const cache = await caches.open(CACHE_NAME);
                await cache.put(request, response.clone());
            }

            return response;
        })
    );
});
