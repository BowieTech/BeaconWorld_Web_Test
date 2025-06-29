'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "259739036b8f3d68c9c2af331838d2e0",
"assets/AssetManifest.bin.json": "3e7b5edcabc4287ea18fceccb3ec51ad",
"assets/AssetManifest.json": "5cadbe661296ea93b67c25837b54ed40",
"assets/assets/fonts/OFL.txt": "41f4a5b5ef66af668062cd65d8a701a2",
"assets/assets/fonts/VT323-Regular.ttf": "034de38c65e202c1cc838e7d014385fd",
"assets/assets/images/avatars/1.png": "a473a39c4d3ac69410f1c2a02daebe9f",
"assets/assets/images/avatars/2.png": "7f82dd2cc5fb84847008565d613a4784",
"assets/assets/images/avatars/3.png": "4e4c186d6a4516b97110c5fe595d6e3f",
"assets/assets/images/avatars/4.png": "dc4b704505d9695e9f7125cbbb0a4665",
"assets/assets/images/avatars/5.png": "833699e066eed569ef8cf3b51dd974c9",
"assets/assets/images/avatars/6.png": "1d8ee4d6e347f9bf97a3cd03257ba709",
"assets/assets/images/avatars/7.png": "26d3cf15e4bec8f5f34680b9f7592a3e",
"assets/assets/images/avatars/8.png": "d27488bca8b0253224c25806b98cf790",
"assets/assets/images/avatars/user_avatar.png": "39fd96e0b06710d492a8134a8cfa2f6f",
"assets/assets/images/avatars/whd.png": "c616b314abe0f2eaecd9056eba490083",
"assets/assets/images/chat_background.png": "7f0dd4ae9d4790b28a0af0a63f34423d",
"assets/assets/images/events/event1.png": "0bb2134efaf63f951de8eae46b8e8c3f",
"assets/assets/images/events/event2.png": "5e0c3508aefd890c973c818bd49ac89c",
"assets/assets/images/events/event3.png": "25b10a45f07c196bd35e7d6d61b787df",
"assets/assets/images/figurine.png": "768c1bb54b1446c6fce781065b69617e",
"assets/assets/images/free_box.png": "0b5b24c3d54b39d3353a816cc7e579e4",
"assets/assets/images/keychain.png": "5efa3aafab2191b1999cf27ce7aefd28",
"assets/assets/images/machine_bg.png": "086640258fb88d47fd4f6688576f8978",
"assets/assets/images/neon_capsule.png": "fa7804d16325ab41ce6690f7eb0a2a6f",
"assets/assets/images/neon_claw.png": "b18984e7c5e7490780db2a89ee9f4098",
"assets/assets/images/premium_box.png": "f94d5d1caff3e5109a9dd5bb9c37f859",
"assets/assets/images/stickers.png": "7f75ecb65d9ed178135d12cf693abef9",
"assets/assets/images/tshirt.png": "6106991d2afedac52aa4db530e9d509e",
"assets/assets/images/whd.png": "c616b314abe0f2eaecd9056eba490083",
"assets/assets/models/bommie.glb": "b075809a9f42d2237cb669918ef3ceb0",
"assets/assets/models/bommieBoy.glb": "3341fec5b07fdc56bea66ffc80153225",
"assets/assets/models/bommieGirl.glb": "a0c24832517dfd856a3310a4b8c73fff",
"assets/assets/videos/1.mp4": "397240c950a73f50c2b352bf2dc87f6a",
"assets/assets/videos/2.mp4": "dad530be19d9560049fa0769bb232193",
"assets/assets/videos/3.mp4": "d0adf2aff4f9a49414a60ed153eca5c5",
"assets/assets/videos/4.mp4": "bdf0710398a47916370dce11e3c4f4e1",
"assets/assets/videos/5.mp4": "d7675a64bea3c9aac882319be68921b1",
"assets/assets/videos/README.md": "f7aaf0d44929f7600a187e29611ee3e3",
"assets/FontManifest.json": "20a332066436d06ae66df1a24cb80cf5",
"assets/fonts/MaterialIcons-Regular.otf": "381ba762722452e8a5d76bc3e0d9ce68",
"assets/NOTICES": "8aead2b5c1e2eb3343f8c411cffe04c8",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/packages/model_viewer_plus/assets/model-viewer.min.js": "dd677b435b16f44e4ca08a9f354bac24",
"assets/packages/model_viewer_plus/assets/template.html": "8de94ff19fee64be3edffddb412ab63c",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "86e461cf471c1640fd2b461ece4589df",
"canvaskit/canvaskit.js.symbols": "68eb703b9a609baef8ee0e413b442f33",
"canvaskit/canvaskit.wasm": "efeeba7dcc952dae57870d4df3111fad",
"canvaskit/chromium/canvaskit.js": "34beda9f39eb7d992d46125ca868dc61",
"canvaskit/chromium/canvaskit.js.symbols": "5a23598a2a8efd18ec3b60de5d28af8f",
"canvaskit/chromium/canvaskit.wasm": "64a386c87532ae52ae041d18a32a3635",
"canvaskit/skwasm.js": "f2ad9363618c5f62e813740099a80e63",
"canvaskit/skwasm.js.symbols": "80806576fa1056b43dd6d0b445b4b6f7",
"canvaskit/skwasm.wasm": "f0dfd99007f989368db17c9abeed5a49",
"canvaskit/skwasm_st.js": "d1326ceef381ad382ab492ba5d96f04d",
"canvaskit/skwasm_st.js.symbols": "c7e7aac7cd8b612defd62b43e3050bdd",
"canvaskit/skwasm_st.wasm": "56c3973560dfcbf28ce47cebe40f3206",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "76f08d47ff9f5715220992f993002504",
"flutter_bootstrap.js": "a279c921917fed22bea6e0b04e70375e",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "bda907f6e8d133fa25dbe263d54fdf90",
"/": "bda907f6e8d133fa25dbe263d54fdf90",
"main.dart.js": "9f24af2a43592293b29bf111d6031905",
"manifest.json": "6195f9bcb089a297b9fdb2838bd6c646",
"version.json": "6b6a5084d7298adba71ae4b18e95495e"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
