// Requires: _source/scripts/src/namespace.js
window.hack.transactions = (function() {

  'use strict';

  var dataTransactionWrapper = '[data-transaction-day]';
  var dataShowTransactions = '[data-show-transactions]';
  var dataTransactionItems = '[data-transaction-items]';

  var showTransactionButtons = Array.from(document.querySelectorAll(dataShowTransactions));

  function init() {
    bindEventListeners();
  }

  function bindEventListeners() {
    showTransactionButtons.forEach(function getSingleButton(button) {
      button.addEventListener('click', handleShowButtonClick , false);
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
