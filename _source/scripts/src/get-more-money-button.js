// Requires: _source/scripts/src/namespace.js
// Requires: _source/scripts/src/overlay.js
// Requires: _source/scripts/src/app.js
window.hack.needMoreMoney = (function(app, overlay, undefined) {

	'use strict';

	var dataNeedMoreMoneyButton = '[data-need-more-money]';
	var needMoreMoneyButton = document.querySelector(dataNeedMoreMoneyButton);

	function init() {
		bindEventListeners();
	}

	function bindEventListeners() {
		needMoreMoneyButton.addEventListener('click', handleNeedMoreMoneyButtonClick, false);
		app.body.addEventListener('mouseover', handleNoBuyButton, false);
    app.body.addEventListener('click', handleCloseGmmOverlay, false);
    app.body.addEventListener('click', handleBuyItem, false);
	}

	function handleNoBuyButton(event) {
		if (event.target.hasAttribute('data-gmm-no-buy')) {
			event.target.style.left = (Math.random()*300)+ 'px';
	        event.target.style.top = (Math.random()*300)+ 'px';
    	}
	}

	function handleNeedMoreMoneyButtonClick() {
		needMoreMoneyButton.innerHTML = 'Getting you money...';

		fetch(`/api/getMoreMoney`)
		  .then(function(response) {
		    return response.json();
		  })
		  .then(function(getMoreMoney) {
	  		var randomIndex = Math.floor(Math.random() * getMoreMoney.length);
		    overlay.show({
	      		contentHTML: getMoreMoneyHtml(getMoreMoney[randomIndex])
		    });
		  });
	}

	function handleCloseGmmOverlay(event) {
		if (event.target.hasAttribute('data-gmm-overlay-close')) {
			event.preventDefault();
			needMoreMoneyButton.innerHTML = 'I require investment capital';
			overlay.hide();
		}
	}

	function handleBuyItem(event){
		if (event.target.hasAttribute('data-gmm-buy-item')) {
			needMoreMoneyButton.innerHTML = 'I require investment capital';
			overlay.hide();
		}
	}


	function getMoreMoneyHtml(getMoreMoney) {
		var html = [];

		html.push(`<div class="wrapper">`);
		html.push(`<div class="upgrade-overlay overlay-narrow">`);

		html.push(`<button type="button" class="upgrade-overlay__close" data-gmm-overlay-close>&#10060</button>`);
		html.push(`<h1 class="upgrade-overlay__heading">${getMoreMoney.name}</h1>`);

		html.push(`<div class="spend__details">`);
		html.push(`<h2 class="upgrade-overlay__sub-heading">&#163;${getMoreMoney.notes}</h2>`);
		html.push(`<img class="spend__image" src="${getMoreMoney.bigImageUrl || getMoreMoney.imageUrl}"/>`);
		html.push(`<a class="spend__link" href="${getMoreMoney.link}" class="btn--primary" target="_blank" data-gmm-buy-item>I want it!</a>`);
		html.push(`<a class="spend__link spend__link--secondary btn--moving" href="#" data-gmm-no-buy>Oh heeeell no!</a>`);

		html.push(`</div>`);
		html.push(`</div>`);
		html.push(`</div>`);

		return html.join('');
	}

	init();

})(window.hack.app, window.hack.overlay);
