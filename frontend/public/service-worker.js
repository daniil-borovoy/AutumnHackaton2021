let doCache = false

// имя кэша
var CACHE_NAME = 'pwa-cache'

// удаляем старый кеш
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys()
      .then(keyList =>
        Promise.all(keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            console.log('Deleting cache: ' + key)
            return caches.delete(key)
          }
        }))
      )
  )
})

// установка PWA
self.addEventListener('install', (event) => {
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache) {
          fetch("asset-manifest.json")
            .then(response => {
              response.json()
            })
            .then(assets => {
              const urlsToCache = [
                "/"
              ]
              cache.addAll(urlsToCache)
              console.log('cached')
            })
        })
    )
  }
})

self.addEventListener('fetch', (event) => {
    if (doCache) {
      event.respondWith(
          caches.match(event.request).then( (response) => {
              return response || fetch(event.request)
          })
      )
    }
})