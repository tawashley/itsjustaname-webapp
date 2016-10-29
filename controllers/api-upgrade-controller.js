var utils = require('../utils/common');
var contentRepository = require('../data/content-repository');
var apiService = require('../services/api-service');

var apiUpgradeController = {

	get: function(request, response) {
		apiService.getUpgradeData(request.params.itemName)
			.then(function(upgradeData) {
				response.json(upgradeData);
			})
	}
};

module.exports = apiUpgradeController;
