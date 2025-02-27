/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["README.md","600053c3d668912462a7c9a17c01cff2"],["android-chrome-192x192.png","984c1cebfd4ae8c77ff0d4c0d8e371b2"],["android-chrome-512x512.png","405f1cd39ef2b948f47c142291d5bd54"],["apple-touch-icon.png","9e1baf28bf3891bb13cb0e70929650b9"],["css/animate.css","53a45805ad706710c1ba025f49b0b9fd"],["css/bootstrap.css","f64e99cca6da14bd8ec1978f5d981475"],["css/bootstrap.css.map","0a4b2b9cae71238d6d81897afae2a834"],["css/flexslider.css","1673331c395c98ca6abef918070ee0d8"],["css/icomoon.css","979328497375c7872482aacfdfc6db98"],["css/magnific-popup.css","357c77ede8a49993fc5ee20ed2503791"],["css/owl.carousel.min.css","4d9c37258b236aa87290e13d8efd98c1"],["css/owl.theme.default.min.css","8c6d37547ed84cbef6238d1d93c10489"],["css/responsive-clock.css","119351c029aebce63e766f192b15096c"],["css/style.css","158dc637f6fc314d200a8ea604984faf"],["css/style.css.map","94966511a5adb8e06f4f7ae7047d0309"],["favicon-16x16.png","2bfbd55e87bf95830768054a8b411e3d"],["favicon-32x32.png","79343ebd732e4686e8ab7969b3c456ad"],["favicon.ico","2969f26f65a96e6f07a4af6a7d9d2c8a"],["fonts/AmsterdamOne.ttf","00258dea00a6febf0410af4f17134f3b"],["fonts/bootstrap/glyphicons-halflings-regular.eot","f4769f9bdb7466be65088239c12046d1"],["fonts/bootstrap/glyphicons-halflings-regular.svg","f721466883998665b87923b92dea655b"],["fonts/bootstrap/glyphicons-halflings-regular.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["fonts/bootstrap/glyphicons-halflings-regular.woff","fa2772327f55d8198301fdb8bcfc8158"],["fonts/bootstrap/glyphicons-halflings-regular.woff2","448c34a56d699c29117adc64c43affeb"],["fonts/icomoon/icomoon.eot","5b6d5ba8772282ed4ca0aa6839a459f4"],["fonts/icomoon/icomoon.svg","c6bb0f071094f51c2493a99992eae499"],["fonts/icomoon/icomoon.ttf","2b47cb1e807c10be1fbf49b51c560913"],["fonts/icomoon/icomoon.woff","9010f12282e711185ee902515b37c386"],["fprint.png","04897a2eb5f8ef797c078096992fa025"],["images/8391494.jpg","76d56f6fe6acf0e1b706b00a1b9df630"],["images/bg.jpg","c55142396ca97206ad3b7a74a11d75e3"],["images/fprint.png","04897a2eb5f8ef797c078096992fa025"],["images/github-logo.png","0c0d24a174b0b87cc24f3b5d95d130ca"],["images/loader.gif","95d64a3d5f5958f597b0a1003e927d3f"],["images/loc.png","f6150b02b36d714374470659a7b979d4"],["images/teja1.webp","aead40e8d49f009b102798c0d6011e5a"],["index.html","49b3223f1af17102f255455a5bb234c1"],["js/bootstrap.min.js","e7d9a06cf9053c51cd4ad3386da0659a"],["js/clock.js","fbe192c2ec11ce269695233543abcf87"],["js/google_map.js","11636d9b18f38fd2ba00e6c4597880b1"],["js/jquery.countTo.js","df8ada8ba717da9720e1f7b76f66f4ba"],["js/jquery.easing.1.3.js","58e2e6f6637b632b908313d74ba26147"],["js/jquery.magnific-popup.min.js","ba9019b0d71f65869dd649c9ac849227"],["js/jquery.min.js","6326c600df01e3bfb9b40e1aa08176f8"],["js/jquery.stellar.min.js","59ddcbcfee26de19386f1d7e30577ac4"],["js/jquery.waypoints.min.js","c95f2ff58abef8c93bc54945a2f71b79"],["js/magnific-popup-options.js","cab9c1fc81ed71277c5312700c0083e1"],["js/main.js","fc3a9d8f812ed8595798528a44a02733"],["js/modernizr-2.6.2.min.js","69fe00ee5b386e5a3d46a4339609d6e3"],["js/myscripts.js","bec438f2d95164aed1ea894434d89f21"],["js/owl.carousel.min.js","db4c9c39a3af9343842156df81f25d08"],["js/respond.min.js","664496c132f56ac93addf0090b29328f"],["js/simplyCountdown.js","25b1a34ddd17ae33733113b65c59a1f3"],["manifest.json","dd923cac4ce591bda00ee7d07597d982"],["sass/_bootstrap-compass.scss","5e3316ca9112bb6254a06e05b8830a7d"],["sass/_bootstrap-mincer.scss","c6da24ef8aca4ffa1c7b0b38de586e4e"],["sass/_bootstrap-sprockets.scss","a2062a2bf8b2fbcd70d90706090b16a7"],["sass/bootstrap.scss","d7ff1a0b849bd927f92f852e23ab354f"],["sass/bootstrap/_alerts.scss","87d299712d38136dbd5f3fd9a93c7f55"],["sass/bootstrap/_badges.scss","8bd42a137bc8a844d0ed06ce2ce31ef1"],["sass/bootstrap/_breadcrumbs.scss","1098bae7c354a4d018073798593e4e4e"],["sass/bootstrap/_button-groups.scss","2abdf5a2a9ed3e11a798d503f6ea37c5"],["sass/bootstrap/_buttons.scss","706d2b7a6efd8bf7525f7d1a1a7b6051"],["sass/bootstrap/_carousel.scss","3fad1ccc913cea4ac5218cccbbf7bf55"],["sass/bootstrap/_close.scss","daa4cba9fee6d198cdda68575c896e8c"],["sass/bootstrap/_code.scss","9ff5419d6e53421322cfd4ee0d1bb9c9"],["sass/bootstrap/_component-animations.scss","c57ecbece2c028b6e311bf066280a0d1"],["sass/bootstrap/_dropdowns.scss","efa6b2086cb8e931a16bfaf1d4dfe0c3"],["sass/bootstrap/_forms.scss","24e2e1d9910e114393385e38c88fb8b9"],["sass/bootstrap/_glyphicons.scss","57bb3a3ce9c6266ece090ea57b420609"],["sass/bootstrap/_grid.scss","83ed0da1d9211aa735cce501f433fec7"],["sass/bootstrap/_input-groups.scss","2dc0ed4722d6475a66c6ca3e49b36de1"],["sass/bootstrap/_jumbotron.scss","8ce848a2e00767286b609c506fc694db"],["sass/bootstrap/_labels.scss","edf6b6d4dd92fc9353311276bfc4d7f3"],["sass/bootstrap/_list-group.scss","66e3953d6d6be6b3a65f47ec9d5eb522"],["sass/bootstrap/_media.scss","5e48b9afbbfc5919936ad87d47cb1c98"],["sass/bootstrap/_mixins.scss","b2cba11343635e98ef45a21b8dfa80ba"],["sass/bootstrap/_modals.scss","bebe506ad8866d091947bf318805beb0"],["sass/bootstrap/_navbar.scss","848d573b3e204452e80d88b934d2304f"],["sass/bootstrap/_navs.scss","18fcc938c78614e4af8e42a75c361c66"],["sass/bootstrap/_normalize.scss","b4ab77d877c4d17a493b4d3922cf29e2"],["sass/bootstrap/_pager.scss","738e5c9d397f22445d292ca018fe29d4"],["sass/bootstrap/_pagination.scss","5ef3ba4534903a74ee3f76af0090cc80"],["sass/bootstrap/_panels.scss","22217a58363b9c9c8d84ef62df523e82"],["sass/bootstrap/_popovers.scss","1dd5a26c55b315cf36a93a9645a1a09b"],["sass/bootstrap/_print.scss","a4df381e56cc92f3b2b12b1c23d88e89"],["sass/bootstrap/_progress-bars.scss","7134fe03605d559981dbdb1fb6125b11"],["sass/bootstrap/_responsive-embed.scss","82db2faef5f270658cf2e1e3bc5edd7e"],["sass/bootstrap/_responsive-utilities.scss","a989469769599385e2930f52e6337fef"],["sass/bootstrap/_scaffolding.scss","1e0cadb96f8775373406e6ec314cd9b8"],["sass/bootstrap/_tables.scss","56f3c0169356099df91f0eb8f44c564f"],["sass/bootstrap/_theme.scss","247b1d6f444c407441778a385d4c5868"],["sass/bootstrap/_thumbnails.scss","576ef08115ca6bd80601ce8d06c76b50"],["sass/bootstrap/_tooltip.scss","d70ad66c9cde55fe54cba558d25b8c5d"],["sass/bootstrap/_type.scss","f03f3b356053ab1e8ba6a4f591a1b6da"],["sass/bootstrap/_utilities.scss","3fa2a5cd866743a26c466e4cd7e745c7"],["sass/bootstrap/_variables.scss","ff418c2f9217c16606356d87fc27315a"],["sass/bootstrap/_wells.scss","a4d33258c4a805eccb2c0429c48bfb67"],["sass/bootstrap/mixins/_alerts.scss","b3c2e9b7b745c578dcff4ff56b93de70"],["sass/bootstrap/mixins/_background-variant.scss","07f2d5189f9b3f20694262753a56a9d5"],["sass/bootstrap/mixins/_border-radius.scss","8944096ec4ed2f763040d64a97b68993"],["sass/bootstrap/mixins/_buttons.scss","34a7a45290f2c86930e389755d9e12c5"],["sass/bootstrap/mixins/_center-block.scss","25daafdcc9e3e8ab9f8ad23cb9bc5763"],["sass/bootstrap/mixins/_clearfix.scss","044ccd698ca36a2de7d4f3439e3e58e4"],["sass/bootstrap/mixins/_forms.scss","a2e40caa69a441187cfb423a0fe1b484"],["sass/bootstrap/mixins/_gradients.scss","e8572c24bb66f4f5109128cd17c5a78a"],["sass/bootstrap/mixins/_grid-framework.scss","cfac4183f657f9a369d1599a5bf1b32c"],["sass/bootstrap/mixins/_grid.scss","e208033058fe9863053ecd83c4351928"],["sass/bootstrap/mixins/_hide-text.scss","b58f0554d7a2b25ddf7069b881f32fd1"],["sass/bootstrap/mixins/_image.scss","8beb42cd0813d9b749abab36256fdbfc"],["sass/bootstrap/mixins/_labels.scss","cdce6c990767c4928c9bca10417e956e"],["sass/bootstrap/mixins/_list-group.scss","8c716ce9b6412cf0bc489d813777b55b"],["sass/bootstrap/mixins/_nav-divider.scss","cf4dac9a3462752072a44024ecf63eb6"],["sass/bootstrap/mixins/_nav-vertical-align.scss","b3faba5d7f83733324e0cf59fcbe3565"],["sass/bootstrap/mixins/_opacity.scss","cfbdf06558612db239a69729157e9c5e"],["sass/bootstrap/mixins/_pagination.scss","d7d8c2f5817dd0b1da6ecacfbfd50d7e"],["sass/bootstrap/mixins/_panels.scss","d36a266882f367c68096f99a84f48bfa"],["sass/bootstrap/mixins/_progress-bar.scss","d40b5868ffb3f18d16be8d879d2c47d7"],["sass/bootstrap/mixins/_reset-filter.scss","8eed88fb1751ec6cd1f34c795ed13a52"],["sass/bootstrap/mixins/_reset-text.scss","617f4a1ad342ec5518550327963bc42c"],["sass/bootstrap/mixins/_resize.scss","7fc8d7b223036d26c2800d2ebdb58046"],["sass/bootstrap/mixins/_responsive-visibility.scss","08409a987481c398d71cac6bcf1fe1e1"],["sass/bootstrap/mixins/_size.scss","591b27859145d5f89fa84f110ddb80d6"],["sass/bootstrap/mixins/_tab-focus.scss","1088351804452a1aa99eed4e868848c2"],["sass/bootstrap/mixins/_table-row.scss","eff6f85ba210b3616f63f6ae5c94e706"],["sass/bootstrap/mixins/_text-emphasis.scss","6152eca39a08d0d4e7951651a3543b03"],["sass/bootstrap/mixins/_text-overflow.scss","09c9e99647eddf5db547fc3d457e69e0"],["sass/bootstrap/mixins/_vendor-prefixes.scss","43a268c946365a37571c510bff6dca1a"],["sass/style.scss","08acf6f0d1307f0c28242c653188d05a"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







