(function(){"use strict";const o={prefetch:"Admin-cube-prefetch-cache-v"+1},l=async e=>{await caches.delete(e)},h=async()=>{self.registration.navigationPreload&&await self.registration.navigationPreload.enable(),await d()},d=async()=>{const e=["v2"],t=(await caches.keys()).filter(c=>!e.includes(c));await Promise.all(t.map(l))},p=async e=>{await(await caches.open(o.prefetch)).addAll(e)},i=async(e,a)=>{if(e.method==="POST")return;await(await caches.open(o.prefetch)).put(e,a)},f=async({request:e,preloadResponsePromise:a,fallbackUrl:t})=>{const c=await caches.match(e);if(c)return c;const s=await a;if(s)return i(e,s.clone()),s;try{const n=await fetch(e);return i(e,n.clone()),n}catch{const r=await caches.match(t);return r||new Response("Network error happened",{status:408,headers:{"Content-Type":"text/plain"}})}};self.addEventListener("activate",e=>{e.waitUntil(h())}),self.addEventListener("install",e=>{e.waitUntil(p(["/"]))}),self.addEventListener("fetch",e=>{e.respondWith(f({request:e.request,preloadResponsePromise:e.preloadResponse,fallbackUrl:"/fallback.html"}))})})();