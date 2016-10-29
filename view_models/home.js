'use strict';

var utils = require('../utils/common');
var templateHelpers = require('../templateHelpers.js');
var apiService = require('../services/api-service');

function createModel(staticData, canonicalUrl) {

	return Promise.all([
		apiService.getTransactions(),
		apiService.getSummary()
	]).then(function(requestData) {

		var [transactions, summary] = requestData;

		return Promise.resolve({
			layout: false,
			data: {
				transactions,
				summary
			},
			helpers: templateHelpers,
			canonicalUrl: canonicalUrl,
			uuid: utils.randomGuid()
		})
	});
}

module.exports = function(staticData, canonicalUrl) {
  return createModel(staticData, canonicalUrl);
};
