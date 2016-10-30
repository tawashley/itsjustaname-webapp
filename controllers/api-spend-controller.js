var utils = require('../utils/common');
var contentRepository = require('../data/content-repository');
var apiService = require('../services/api-service');

var apiUpgradeController = {

	get: function(request, response) {
		apiService.getSpendData()
			.then(function(spendData) {
				response.json(spendData);
			})
	}
};

module.exports = apiUpgradeController;
