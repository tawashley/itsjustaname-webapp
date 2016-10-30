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
    app.body.addEventListener('click', handleRefreshBurnMoney, false);
    app.body.addEventListener('click', handleCloseBurnOverlay, false);
  }

  function handleRefreshBurnMoney(event) {
    if (event.target.hasAttribute('data-burn-money-refresh')) {
      event.preventDefault();
      setLoadingUi();
      refreshBurnMoneyUi();
    }
  }

  function handleCloseBurnOverlay(event) {
    if (event.target.hasAttribute('data-burn-overlay-close')) {
      event.preventDefault();
      burnMoneyButton.innerHTML = 'Burn some money!';
      overlay.hide();
    }
  }

  function getSpendHtml(spendjson) {
    var html = [];

    html.push(`<div class="wrapper">`);
    html.push(`<div class="upgrade-overlay overlay-narrow">`);

    html.push(`<button type="button" class="upgrade-overlay__close" data-burn-overlay-close>&#10060</button>`);
    html.push(`<h1 class="upgrade-overlay__heading">${spendjson.name}</h1>`);

    html.push(`<div class="spend__details">`);
    html.push(`<h2 class="upgrade-overlay__sub-heading">&#163;${spendjson.price}</h2>`);
    html.push(`<img class="spend__image" src="${spendjson.bigImageUrl || spendjson.imageUrl}"/>`);
    html.push(`<a class="spend__link" href="${spendjson.linkToArticle}" class="btn--primary">Take me to the store!</a>`);
    html.push(`<a class="spend__link spend__link--secondary" href="#" data-burn-money-refresh class="">Show me something else</a>`);

    html.push(`</div>`);
    html.push(`</div>`);
    html.push(`</div>`);

    return html.join('');
  }

  function setLoadingUi() {
    var html = [];

    html.push(`<div class="wrapper">`);
    html.push(`<div class="upgrade-overlay overlay-narrow">`);

    html.push(`<button type="button" class="upgrade-overlay__close" data-overlay-close>&#10060</button>`);
    html.push(`<h1 class="upgrade-overlay__heading">Finding another product...</h1>`);

    html.push(`</div>`);
    html.push(`</div>`);

    overlay.setContent(html.join(''));
  }

  function getFetchObject() {
    var header = new Headers();
    header.append('pragma', 'no-cache');
    header.append('cache-control', 'no-cache');

    return {
      method: 'GET',
      headers: header,
    };
  }

  function refreshBurnMoneyUi() {
    fetch(`/api/spend`, getFetchObject())
      .then(function(response) {
        return response.json();
      })
      .then(function(Spendjson) {
        overlay.setContent(getSpendHtml(Spendjson));
      });
  }

  function handleBurnMoneyButtonClick() {
    burnMoneyButton.innerHTML = 'Getting a product...';

    fetch(`/api/spend`, getFetchObject())
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
