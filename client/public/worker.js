const CACHE_NAME = 'v1'



self.addEventListener('install', installer => {
    const done = async () => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll([
            '/',
            '/completed'
        ])
    }
    installer.waitUntil(done())
})

self.addEventListener('fetch', fetchEvent => {
    
    const url = fetchEvent.request.url;

    const getResponse = async (request) => {
        let response;
        
        response = await caches.match(request)
        if(response && response.status === 200) {
            return response;
        }

        try {
            response = await fetch(request);
            if(response && response.status === 404) {
                response = await caches.match('/404.html');
                return response;
            }
        }
        catch(error) {
            return await caches.match('/offline.html');
        }

        const clone = response.clone();
        const cache = await caches.open(CACHE_NAME);
        await cache.put(url, clone);
        return response;

    }

    fetchEvent.respondWith(getResponse(fetchEvent.request))
})

self.addEventListener('activate', activator => {
    const done = async () => {
        const cacheNames = await caches.keys();
        return Promise.all(
            cacheNames.map(cache => {
                if(cache !== CACHE_NAME) {
                    return caches.delete(cache);
                }
            })
        )
    }
    activator.waitUntil(done())
})