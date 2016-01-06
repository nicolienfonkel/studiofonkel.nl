(function($){
  'use strict'

  function addFont() {
    var style = document.createElement('style')
    style.rel = 'stylesheet'
    document.head.appendChild(style)
    style.textContent = localStorage.siteFonts
  }

  if ($('html').hasClass('sessionstorage')) {
    try {
      if (localStorage.siteFonts) {
        // The font is in localStorage, we can load it directly
        addFont()
      } else {
        // We have to first load the font file asynchronously
        var request = new XMLHttpRequest()
        request.open('GET', '/fonts/fonts.css', true)

        request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
            // We save the file in localStorage
            localStorage.siteFonts = request.responseText
            addFont()
          }
        }

        request.send()
      }
    } catch(ex) {
        // maybe load the font synchronously for woff-capable browsers
        // to avoid blinking on every request when localStorage is not available
    }
  }
  else {
    var style = document.createElement('link')
    style.rel = 'stylesheet'
    style.href = '/fonts/fonts.css'
    document.head.appendChild(style)
  }

}(jQuery));
