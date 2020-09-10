const staticCacheName = 'site-static'; //can be called anything
const dynamicCacheName = 'site-dynamic-v1';
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/weather-app.js',
    '/weather-app.css',
    '/images/icon-512x512.png',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css',
    'fallback.html'
];

//install service worker
self.addEventListener('install', (event)=>{
    //console.log('Service worker has been installed');

    event.waitUntil(
        caches.open(staticCacheName).then(cache =>{
            console.log('caching assets...');
            cache.addAll(assets);
        })
    );
    
});

//activate event
self.addEventListener('activate', (event)=>{
    console.log('Service worker has been activated');
});

//fetch event
self.addEventListener('fetch', (event)=>{
    console.log('fetch event', event);

    event.respondWith(
        //look for a matching value pair in the cache and then store that cache response in cacheRes
        //return the cacheResponse or if its empty (no matches) then just return the original fetch request

        caches.match(event.request).then(cacheRes =>{
            //console.log('testing..', cacheRes);
            return cacheRes || fetch(event.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache =>{
                    cache.put(event.request.url, fetchRes.clone());
                    return fetchRes;
                })
            });
            //fallback page for the user
        }).catch(()=> caches.match('fallback.html'))
    );
});