var staticCacheName = 'ementas-static-5';
var dynamicCacheName = 'ementas-dynamic-1';
var allCaches = [
  staticCacheName,
  dynamicCacheName
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        'js/riot+compiler.min.js',
		'js/moment.min.js',
		'js/route.min.js',
		'ementa.tag',
		'manifest.json',
        'css/main.css',
		'images/',
		'/'
      ]);
    })
  );
});


self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('ementas-') &&
                 !allCaches.includes(cacheName);
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});



self.addEventListener('fetch', function(event) {

	var requestUrl = new URL(event.request.url);

	if (requestUrl.pathname.startsWith('/data')) {
		event.respondWith(
			caches.open(dynamicCacheName).then(function(cache){
				return cache.match(event.request).then(function(response){
					return response || fetch(event.request).then(function(response){
						cache.put(event.request, response.clone());
						return response;
					})
				})
			})
		);
		return;
	}

	event.respondWith(
    	caches.match(event.request).then(function(response) {
			console.log(response);
      		return response || fetch(event.request);
    	})
  	);
});

