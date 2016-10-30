'use strict';

var utils = require('../utils/common');
var contentRepository = require('../data/content-repository');
var apiService = require('../services/api-service');

var apiGetMoreMoneyController = {

	get: function(request, response) {
		
		apiService.getMoreMoney()
			.then(function(getMoreMoney) {
				response.json(getMoreMoney);
			})
	}
};

module.exports = apiGetMoreMoneyController;
