// Requires: _source/scripts/src/namespace.js
// Requires: _source/scripts/src/overlay.js
// Requires: _source/scripts/src/app.js
window.hack.burnMoney = (function(app, overlay, undefined) {

  'use strict';

  var dataBurnMoneyButton = '[data-burn-money]';
  var burnMoneyButton = document.querySelector(dataBurnMoneyButton);

  function init() {
    bindEventListeners();
  }

  function bindEventListeners() {
    burnMoneyButton.addEventListener('click', handleBurnMoneyButtonClick, false);
  }

  function getSpendHtml(spendjson) {
    console.log(spendjson);

    var html = [];

    html.push(`<div class="wrapper">`);
    html.push(`<div class="upgrade-overlay overlay-narrow">`);

    html.push(`<button type="button" class="upgrade-overlay__close" data-overlay-close>&#10060</button>`);
    html.push(`<h1 class="upgrade-overlay__heading">${spendjson.name}</h1>`);

    html.push(`<div class="spend__details">`);
    html.push(`<h2 class="upgrade-overlay__sub-heading">&#163;${spendjson.price}</h2>`);
    html.push(`<img class="spend__image" src="${spendjson.imageUrl}"/>`)
    html.push(`<a class="spend__link" href="${spendjson.linkToArticle}" class="btn--primary">I can't miss this!</a>`)

    html.push(`</div>`);
    html.push(`</div>`);
    html.push(`</div>`);

    return html.join('');
  }

  function handleBurnMoneyButtonClick() {
    fetch(`/api/spend`)
      .then(function(response) {
        return response.json();
      })
      .then(function(Spendjson) {
        overlay.show({
          contentHTML: getSpendHtml(Spendjson)
        });
      });
  }

  init();

})(window.hack.app, window.hack.overlay);
