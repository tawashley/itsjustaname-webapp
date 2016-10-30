// Requires: _source/scripts/src/namespace.js
// Requires: _source/scripts/src/app.js
window.hack.makeTransactions = (function() {

  'use strict';

  var dataTransactionAddLine = '[data-transaction-add-line]';
  var dataTransactionList = '[data-transaction-list]';
  var dataTransactionListLength = '[data-transaction-list-length]';

  var transactionAddLineButton = document.querySelector(dataTransactionAddLine);
  var transactionList = document.querySelector(dataTransactionList);
  var transactionListLength = document.querySelector(dataTransactionListLength);
  var counter = 1;

  var cacheList = ['transaction01'];

  function bindEventListeners() {
    if(document.querySelector('[data-make-transaction]')) {
      transactionAddLineButton.addEventListener('click', handleAddLineButtonClick, false);
    }
  }

  function getListItemHtml() {
    var html = [];

    html.push(`<div class="transaction-list__field">`);
    html.push(`<label for="transaction0${counter}-name">Name:</label>`);
    html.push(`<input type="text" class="transaction-list__input" id="transaction0${counter}-name" name="transaction0${counter}-name" value="" required>`);
    html.push(`</div>`);

    html.push(`<div class="transaction-list__field">`);
    html.push(`<label for="transaction0${counter}-creditdebit">Is Debit?</label>`);
    html.push(`<input type="checkbox" id="transaction0${counter}-creditdebit" class="transaction-list__input" name="transaction0${counter}-creditdebit" value="true">`);
    html.push(`</div>`);

    html.push(`<div class="transaction-list__field">`);
    html.push(`<label for="transaction0${counter}-amount">Amount</label>`);
    html.push(`<input type="number" id="transaction0${counter}-amount" class="transaction-list__input" name="transaction0${counter}-amount" value="" required>`);
    html.push(`</div>`);

    return html.join('');
  }

  function handleAddLineButtonClick() {
    counter++;
    cacheList = transactionListLength.value.split(',');
    cacheList.push(`transaction0${counter}`);
    transactionListLength.value = cacheList.join(',');

    transactionList.insertAdjacentHTML('beforeend', getListItemHtml());
  }

  function init() {
    bindEventListeners();
  }

  init();
})();
