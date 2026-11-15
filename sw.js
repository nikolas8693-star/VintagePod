var C='vintagepod-v1';
var Z='https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
self.addEventListener('install',function(e){
 e.waitUntil(caches.open(C).then(function(c){
  return c.addAll(['./','index.html','apple-touch-icon.png']).then(function(){
   return fetch(new Request(Z,{mode:'no-cors'})).then(function(r){return c.put(Z,r)}).catch(function(){})})
 }).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){
 e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==C}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
 if(e.request.method!=='GET')return;
 e.respondWith(fetch(e.request).then(function(r){
  if(r&&(r.ok||r.type==='opaque')){var cp=r.clone();caches.open(C).then(function(c){c.put(e.request,cp)})}
  return r}).catch(function(){
  return caches.match(e.request).then(function(m){return m||caches.match('index.html')})}))});
