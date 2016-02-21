/**
 * [description]
 * @param  {[type]} win [description]
 * @return {[type]}     [description]
 * <div class="image-container lazy-load">
 *     <noscript data-src-small="img/320.jpg"
 *         data-src-medium="img/640.jpg"
 *         data-src-high="img/720.jpg"
 *         data-src-x-high="img/720.jpg">
 *             <img src="img/320.jpg" alt="">
 *     </noscript>
 * </div>
 */
(function(win) {
  'use strict';

  var screenPixelRatio = function() {
    var retVal = 1;
    if (win.devicePixelRatio) {
      retVal = win.devicePixelRatio;
    } else if ('matchMedia' in win && win.matchMedia) {
      if (win.matchMedia('(min-resolution: 2dppx)').matches ||
        win.matchMedia('(min-resolution: 192dpi)').matches) {
        retVal = 2;
      } else if (win.matchMedia('(min-resolution: 1.5dppx)').matches ||
        win.matchMedia('(min-resolution: 144dpi)').matches) {
        retVal = 1.5;
      }
    }
    return retVal;
  },
    getImageVersion = function() {

      var pixelRatio = screenPixelRatio();
      var width = win.innerWidth * pixelRatio;

      // sizes: small = 320, medium = 640, high = 720
      if (width > 320 && width <= 640) {
        return 'medium';
      } else if (width > 640 && pixelRatio > 1) {
        return 'high';
      }else if (width > 640) {
        return 'x-high';
      } else {
        return 'small'; // default version
      }
    },
    lazyloadImage = function(imageContainer) {

      var imageVersion = getImageVersion();

      if (!imageContainer || !imageContainer.children) {
        return;
      }
      var img = imageContainer.children[0];

      if (img) {
        var imgSRC = img.getAttribute('data-src-' + imageVersion);
        var altTxt = img.getAttribute('data-alt');
        if (imgSRC) {
          try {
            var imageElement = new Image();
            imageElement.src = imgSRC;
            imageElement.setAttribute('alt', altTxt ? altTxt : '');
            imageContainer.appendChild(imageElement);
          } catch (e) {
            console.log('img error' + e);
          }
          imageContainer.removeChild(imageContainer.children[0]);
        }
      }
    },
    lazyLoadedImages = document.getElementsByClassName('lazy-load');

  for (var i = 0; i < lazyLoadedImages.length; i++) {
    lazyloadImage(lazyLoadedImages[i]);
  }

})(window);
