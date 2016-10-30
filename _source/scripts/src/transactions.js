// Requires: _source/scripts/src/namespace.js
// Requires: _source/scripts/src/overlay.js
// Requires: _source/scripts/src/app.js
window.hack.transactions = (function(app, overlay, undefined) {

  'use strict';

  var dataShowTransactions = '[data-show-transactions]';
  var dataTransactionItems = '[data-transaction-items]';
  var dataTransactionUpgradeButton = '[data-transaction-item-upgrade]';

  var showTransactionButtons = Array.from(document.querySelectorAll(dataShowTransactions));
  var transactionUpgradeButtons = Array.from(document.querySelectorAll(dataTransactionUpgradeButton));

  function init() {
    bindEventListeners();
  }

  function bindEventListeners() {
    showTransactionButtons.forEach(function getSingleButton(button) {
      button.addEventListener('click', handleShowButtonClick , false);
    });

    transactionUpgradeButtons.forEach(function getSingleUpgradeButton(upgradeButton) {
      upgradeButton.addEventListener('click', handleUpgradeButtonClick, false);
    });
  }

  function getUpgradeHtml(json) {
    var html = [];

    html.push(`<div class="wrapper">`);
    html.push(`<div class="upgrade-overlay">`);
    html.push(`<button type="button" class="upgrade-overlay__close" data-overlay-close>&#10060</button>`);
    html.push(`<h1 class="upgrade-overlay__heading">Tired of NOT paying premium?</h1>`);
    html.push(`<h2 class="upgrade-overlay__sub-heading">Go on, spoil yourself!</h2>`);
    html.push(`<ul class="upgrade-overlay__items">`);

    for (var i = 0; i < json.length; i++) {
      html.push(`<li class="upgrade-overlay__item">`);
      html.push(`<a class="upgrade-item__link clearfix" href="${json[i].link}" target="_blank">`);
      html.push(`<img class="upgrade-item__img" src="${json[i].imageUrl}" />`);
      html.push(`<div class="upgrade-item__details">`);
      html.push(`<p class="upgrade-item__name">${json[i].name}</p>`);
      html.push(`<p class="upgrade-item__notes">${json[i].notes}</p>`);
      html.push(`</div>`);
      html.push(`</a>`);
      html.push(`</li>`);
    }

    html.push(`</ul>`);
    html.push(`</div>`);

    return html.join('');
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

  function handleUpgradeButtonClick(event) {
    var button = event.currentTarget;
    var transactionName = button.dataset.transactionItemUpgrade.toLowerCase();

    event.preventDefault();

    fetch(`/api/upgrade/${transactionName}`, getFetchObject())
      .then(function(response) {
        return response.json();
      })
      .then(function(upgradeJson) {
        overlay.show({
          contentHTML: getUpgradeHtml(upgradeJson)
        });
      });
  }

  function handleShowButtonClick(event) {
    var transactionItemsButton = event.currentTarget;
    //Grr...
    var transactionWrapper = transactionItemsButton.parentNode.parentNode.parentNode;
    var transactionItems = transactionWrapper.querySelector(dataTransactionItems);

    transactionItems.classList.toggle(app.class.isVisible);

    if(transactionItems.classList.contains(app.class.isVisible)) {
      transactionItemsButton.innerHTML = 'Hide transactions';
    } else {
      transactionItemsButton.innerHTML = 'Show transactions';
    }

  }

  init();

})(window.hack.app, window.hack.overlay);
