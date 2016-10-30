'use strict';

var utils = require('../utils/common');
var contentRepository = require('../data/content-repository');
var apiService = require('../services/api-service');

var apiAlternativeIncomeController = {

	get: function(request, response) {
		apiService.getAlternativeIncome()
			.then(function(alternativeIncome) {
				response.json(alternativeIncome);
			});
	}
};

module.exports = apiAlternativeIncomeController;
