'use strict';

var utils = require('../utils/common');
var contentRepository = require('../data/content-repository');
var apiService = require('../services/api-service');

function mapDataToSendToApi() {

}

var apiUpgradeController = {

	post: function(request, response) {
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
			console.log('we have some body');
			console.log(body);
		})
	}
};

module.exports = apiUpgradeController;
