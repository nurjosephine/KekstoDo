const CACHE_NAME='kekstodo-v4.14-verified-selector';
const APP_SHELL=['./','./index.html','./styles-v414.css','./app-v414.js','./manifest.webmanifest','./apple-touch-icon.png','./unicorn-icon.svg','./icons/mummy-ninja.webp','./icons/mummy-dino.webp','./icons/apple-touch-icon.png','./icons/favicon-64.png','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{if(r&&r.ok){const copy=r.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,copy));}return r;}).catch(()=>caches.match(e.request).then(c=>c||caches.match('./index.html'))));});
