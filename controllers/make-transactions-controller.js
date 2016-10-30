'use strict';

var utils = require('../utils/common');
var contentRepository = require('../data/content-repository');
var ViewModel = require('../view_models/make-transactions');

var MakeTransactionsController = {

	get: function(request, response) {

		if (!request.body) {
			return response.sendStatus(400);
		}

		var canonicalUrl = utils.getCanonicalUrl(request);
		var makeTransactionsViewModel = ViewModel({}, canonicalUrl);

		makeTransactionsViewModel
			.then(function(data) {
				response.render('make-transactions', data);
			});
	}
};

module.exports = MakeTransactionsController;
