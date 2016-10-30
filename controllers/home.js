'use strict';

var utils = require('../utils/common');
var contentRepository = require('../data/content-repository');
var ViewModel = require('../view_models/home');

var HomeController = {

	get: function(request, response) {

		if (!request.body) {
			return response.sendStatus(400);
		}

		var canonicalUrl = utils.getCanonicalUrl(request);
		var homeViewModel = ViewModel({}, canonicalUrl);

		homeViewModel
			.then(function(data) {
				response.render('index', data);
			});
	}
};

module.exports = HomeController;
