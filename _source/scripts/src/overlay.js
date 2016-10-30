// Requires: _source/scripts/src/namespace.js
window.hack.overlay = (function() {

  var dataOverlay = '[data-overlay]';
  var dataOverlayContent = '[data-overlay-content]';
  var dataOverlayClose = '[data-overlay-close]';

  var overlay = document.querySelector(dataOverlay);
  var overlayContent = document.querySelector(dataOverlayContent);
  var overlayClose = document.querySelector(dataOverlayClose);

  'use strict';

  function init() {
    bindEventListeners();
  }

  function showOverlay(options) {
    overlay.classList.add('is-visible');
    overlayContent.innerHTML = options.contentHTML;
  }

  function hideOverlay() {
    overlay.classList.remove('is-visible');
  }

  function bindEventListeners() {
    overlayClose.addEventListener('click', hideOverlay, false);
  }

  return {
    show: showOverlay,
    hide: hideOverlay
  }

  init();

})()
