'use strict';

var utils = require('../utils/common');
var contentRepository = require('../data/content-repository');
var apiService = require('../services/api-service');
var templateHelpers = require('../templateHelpers.js');

function mapDataToSendToApi() {

}

var apiUpgradeController = {

	post: function(request, response) {
		console.log('hits 1');

		apiService.sendTransactions({
			transactions: [
				{
					"merchant": "tesco",
					"amount": 29500,
					"creditOrDebit": "Debit",
					"createdDate": "2016-10-30T00:00:00.000"
				},
				{
					"merchant": "pay",
					"amount": 344444,
					"creditOrDebit": "Credit",
					"createdDate": "2016-10-30T00:00:00.000"
				}
			]
		}).then(function(body) {

			var canonicalUrl = utils.getCanonicalUrl(request);

			response.url = '/';
			
			response.render('index', {
				layout: false,
				data: {
					transactions: body.transactions,
					summary: body.summary
				},
				helpers: templateHelpers,
				canonicalUrl: canonicalUrl,
				uuid: utils.randomGuid()
			});

			console.log(body);
		})
	}
};

module.exports = apiUpgradeController;
