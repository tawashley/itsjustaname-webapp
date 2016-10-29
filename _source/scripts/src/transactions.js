// Requires: _source/scripts/src/namespace.js
window.hack.transactions = (function() {

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

  function handleUpgradeButtonClick(event) {
    var button = event.currentTarget;
    var transactionName = button.dataset.transactionItemUpgrade.toLowerCase();

    fetch(`/api/upgrade/${transactionName}`)
      .then(function(response) {
        return response.json()
      })
      .then(function(json) {
        console.log('upgrades', json);
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

})()
