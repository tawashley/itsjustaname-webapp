// Requires: _source/scripts/src/namespace.js
// Requires: _source/scripts/src/overlay.js
window.hack.transactions = (function(overlay, undefined) {

  'use strict';

  var dataTransactionWrapper = '[data-transaction-day]';
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
    })

    transactionUpgradeButtons.forEach(function getSingleUpgradeButton(upgradeButton) {
      upgradeButton.addEventListener('click', handleUpgradeButtonClick, false);
    })
  }

  function getUpgradeHtml(json) {
    var html = [];

    html.push(`<div class="wrapper">`)
    html.push(`<div class="upgrade-overlay">`);
    html.push(`<h1 class="upgrade-overlay__heading">Tied of not paying premium?</h1>`);
    html.push(`<h2 class="upgrade-overlay__sub-heading">Go on, spoil yourself!</h2>`);
    html.push(`<ul class="upgrade-overlay__items">`);

    for (var i = 0; i < json.length; i++) {
      html.push(`<li class="upgrade-overlay__item">`);
      html.push(`<a class="upgrade-item__link clearfix" href="${json[i].link}">`);
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

  function handleUpgradeButtonClick(event) {
    var button = event.currentTarget;
    var transactionName = button.dataset.transactionItemUpgrade.toLowerCase();

    fetch(`/api/upgrade/${transactionName}`)
      .then(function(response) {
        return response.json()
      })
      .then(function(upgradeJson) {
        console.log(upgradeJson);

        overlay.show({
          contentHTML: getUpgradeHtml(upgradeJson)
        });
      })
  }

  function handleShowButtonClick(event) {
    var transactionItemsButton = event.currentTarget;
    var transactionWrapper = transactionItemsButton.parentNode;
    var transactionItems = transactionWrapper.querySelector(dataTransactionItems);

    transactionItems.classList.toggle('is-visible');

    if(transactionItems.classList.contains('is-visible')) {
      transactionItemsButton.innerHTML = 'Hide transactions';
    } else {
      transactionItemsButton.innerHTML = 'Show transactions';
    }

  }

  init();

})(window.hack.overlay)
