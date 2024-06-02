// plugins/histats.js
import { defineNuxtPlugin } from '#app'

const HistatsPlugin = defineNuxtPlugin((nuxtApp) => {
  // Check if we're running on the client side
  if (process.client) {
    var _Hasync= _Hasync|| [];
    _Hasync.push(['Histats.start', '1,4870396,4,0,0,0,00010000']);
    _Hasync.push(['Histats.fasi', '1']);
    _Hasync.push(['Histats.track_hits', '']);

    (function() {
      var hs = document.createElement('script');
      hs.type = 'text/javascript';
      hs.async = true;
      hs.src = '//s10.histats.com/js15_as.js';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);
    })();
  }
});

export default HistatsPlugin;