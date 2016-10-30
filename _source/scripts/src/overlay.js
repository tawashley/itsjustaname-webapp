// Requires: _source/scripts/src/namespace.js
// Requires: _source/scripts/src/app.js
window.hack.overlay = (function(app) {

  'use strict';

  var dataOverlay = '[data-overlay]';
  var dataOverlayContent = '[data-overlay-content]';

  var overlay = document.querySelector(dataOverlay);
  var overlayContent = document.querySelector(dataOverlayContent);

  function init() {
    bindEventListeners();
  }

  function showOverlay(options) {
    overlay.classList.add(app.class.isVisible);
    app.body.classList.add(app.class.hasOverlay);
    overlayContent.innerHTML = options.contentHTML;
  }

  function hideOverlay() {
    app.body.classList.remove(app.class.hasOverlay);
    overlay.classList.remove(app.class.isVisible);
  }

  function bindEventListeners() {
    document.querySelector('body').addEventListener('click', handleOverlayCloseClick, false);
  }

  function handleOverlayCloseClick(evemt) {
    if (event.target.hasAttribute('data-overlay-close')) {
      hideOverlay();
    }
  }

  init();

  return {
    show: showOverlay,
    hide: hideOverlay
  };

})(window.hack.app);
