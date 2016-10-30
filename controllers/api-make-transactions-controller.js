'use strict';

var utils = require('../utils/common');
var contentRepository = require('../data/content-repository');
var apiService = require('../services/api-service');
var templateHelpers = require('../templateHelpers.js');

function mapFormData(requestBody) {
	var requestData = {
		transactions: []
	};
	var fieldKeys = requestBody['transaction-length'].split(',');

	fieldKeys.forEach(function requestBodyKey(element) {

		requestData.transactions.push({
			"merchant": requestBody[element + '-name'],
			"amount": requestBody[element + '-amount'],
			"creditOrDebit": (requestBody[element + '-creditdebit'] === 'true') ? 'Debit' : 'Credit',
			"createdDate": new Date().toISOString()
		})
	})

	return requestData;
}

var apiUpgradeController = {

	post: function(request, response) {

		var requestData = mapFormData(request.body);

		console.log(requestData);

		apiService.sendTransactions(requestData)
		// apiService.sendTransactions({
		// 		transactions: [
		// 			{
		// 				"merchant": "tesco",
		// 				"amount": 29500,
		// 				"creditOrDebit": "Debit",
		// 				"createdDate": "2016-10-30T00:00:00.000"
		// 			},
		// 			{
		// 				"merchant": "pay",
		// 				"amount": 344444,
		// 				"creditOrDebit": "Credit",
		// 				"createdDate": "2016-10-30T00:00:00.000"
		// 			}
		// 		]
		// 	})
			.then(function(jsonResponse) {

			var canonicalUrl = utils.getCanonicalUrl(request);

			response.url = '/';

			response.render('index', {
				layout: false,
				data: {
					transactions: jsonResponse.transactions,
					summary: jsonResponse.summary
				},
				helpers: templateHelpers,
				canonicalUrl: canonicalUrl,
				uuid: utils.randomGuid()
			});

		})
	}
};

module.exports = apiUpgradeController;
