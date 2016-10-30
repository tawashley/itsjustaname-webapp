// Requires: _source/scripts/src/namespace.js
// Requires: _source/scripts/src/app.js
// Requires: _source/scripts/src/overlay.js
window.hack.makeTransactions = (function(overlay, undefined) {

  'use strict';

  var dataTransactionAddLine = '[data-transaction-add-line]';
  var dataTransactionList = '[data-transaction-list]';
  var dataTransactionListLength = '[data-transaction-list-length]';
  var dataTransactionForm = '[data-make-transaction-form]';

  var transactionAddLineButton = document.querySelector(dataTransactionAddLine);
  var transactionList = document.querySelector(dataTransactionList);
  var transactionListLength = document.querySelector(dataTransactionListLength);
  var transactionForm = document.querySelector(dataTransactionForm);
  var counter = 1;

  var cacheList = ['transaction01'];

  function bindEventListeners() {
    if(document.querySelector('[data-make-transaction-form]')) {
      transactionAddLineButton.addEventListener('click', handleAddLineButtonClick, false);
    }

    transactionForm.addEventListener('submit', function(event) {
      overlay.show({
        contentHTML: getLoadingHTML()
      });
    }, false);
  }

  function getLoadingHTML() {
    var html = [];

    html.push('<div class="wrapper">');
    html.push('<div class="overlay-narrow">');
    html.push('<h2 class="transactions__header overlay__spaced">Analysing transaction data...</h2>');
    html.push('</div>');
    html.push('</div>');

    return html.join('');
  }

  function getListItemHtml() {
    var html = [];
    html.push(`<div class="grid">`);
    html.push(`<li data-transaction-list-item class="transaction-list__item">`);
    html.push(`<div class="col col--1/3--md">`);
    html.push(`<div class="transaction-list__field">`);
    html.push(`<label for="transaction0${counter}-name" class="transaction-list__label">Description:</label>`);
    html.push(`<input type="text" class="transaction-list__input" id="transaction0${counter}-name" name="transaction0${counter}-name" value="" required>`);
    html.push(`</div>`);
    html.push(`</div>`);

    html.push(`<div class="col col--1/3--md">`);
    html.push(`<div class="transaction-list__field">`);
    html.push(`<label for="transaction0${counter}-creditdebit" class="transaction-list__label">Check if debit:</label>`);
    html.push(`<input type="checkbox" id="transaction0${counter}-creditdebit" class="transaction-list__input" name="transaction0${counter}-creditdebit" value="true">`);
    html.push(`</div>`);
    html.push(`</div>`);

    html.push(`<div class="col col--1/3--md">`);
    html.push(`<div class="transaction-list__field">`);
    html.push(`<label for="transaction0${counter}-amount" class="transaction-list__label">Amount:</label>`);
    html.push(`<input type="number" id="transaction0${counter}-amount" class="transaction-list__input" name="transaction0${counter}-amount" value="" required>`);
    html.push(`</div>`);
    html.push(`</div>`);
    html.push(`</li>`);
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
})(window.hack.overlay);
