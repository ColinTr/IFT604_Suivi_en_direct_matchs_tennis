/*
Fichier venant de : https://github.com/UnicornUniverse/reactiveconf-service-worker/blob/master/client/public/sw-ex-complete.js
 */
const appName = "TennisBet";
const appVersion = "1.0.0";
const DYNAMIC_CACHE = appName + "_DYNAMIC_" + appVersion;

const filesToCachePriority = [
    "",
    "/",
    "/parties",
    "/paris",
    "/index.html",
    "/index.js",
    "/App.js",
    "/manifest.json",
    "./assets",
    "/favicon.ico",
    "/logo192.png",
    "/static/js/bundle.js",
    "/static/js/1.chunk.js",
    "/static/js/main.chunk.js",
    "/static/js/main.chunk.js.map",
    "/static/js/bundle.js.map",
    "/static/js/1.chunk.js.map",
    "/static/js/0.chunk.js",
    "/static/js/0.chunk.js.map",
    "/static/media/tennis_raquette.04bda21f.png",
];
var CACHE = 'network-or-cache';

self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');
 
  evt.waitUntil(precache());
});

 
self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.');
  evt.respondWith(fromNetwork(evt.request, 400).catch(function () {
    return fromCache(evt.request);
  }));
});

 
function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll(filesToCachePriority);
  });
}

 
function fromNetwork(request, timeout) {
  return new Promise(function (fulfill, reject) {

 
    var timeoutId = setTimeout(reject, timeout);

 
    fetch(request).then(function (response) {
      clearTimeout(timeoutId);
      fulfill(response);
 
    }, reject);
  });
}

 
function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match' + request);
    });
  });
}