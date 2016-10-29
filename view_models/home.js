'use strict';

var utils = require('../utils/common');
var templateHelpers = require('../templateHelpers.js');
var apiService = require('../services/api-service');

function createModel(staticData, canonicalUrl) {

	return new Promise(function(resolve, reject) {
		apiService.getTransactions(function(transactionData) {
			resolve({
				layout: false,
				data: transactionData,
				helpers: templateHelpers,
				canonicalUrl: canonicalUrl,
				uuid: utils.randomGuid()
			});
		})
	})

	// apiService.getTransactions(function(transactionData) {
	// 	console.log(transactionData);
	//
	// 	return {
	// 		layout: false,
	// 		data: transactionData,
	// 		helpers: templateHelpers,
	// 		canonicalUrl: canonicalUrl,
	// 		uuid: utils.randomGuid()
	// 	};
	// })

	// return {
	// 	layout: false,
	// 	data: transationData,
	// 	helpers: templateHelpers,
	// 	canonicalUrl: canonicalUrl,
	// 	uuid: utils.randomGuid()
	// };
}

module.exports = function(staticData, canonicalUrl) {
  return createModel(staticData, canonicalUrl);
};
