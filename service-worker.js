const CACHE='ad-fontes-v40';
const STATIC=['./','./index.html','./installer/','./installer/index.html','./styles.css?v=40','./app.js?v=40','./meditations.js?v=40','./assets/file_0000000000c082108ce827725e006074.png?v=40','./assets/home-bible.webp?v=40','./assets/home-thomas.webp?v=40','./assets/home-about.webp?v=40','./assets/bible-autel-v38.webp?v=40','./assets/about-landscape-v39.webp?v=40','./assets/thomas-meditation-v40.webp?v=40','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(STATIC)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);
  if(url.origin==='https://categpt.chat'){
    e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r;}).catch(()=>caches.match(e.request)));
    return;
  }
  e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r;}).catch(()=>caches.match(e.request)));
});
