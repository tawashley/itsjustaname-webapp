'use strict';

var multer = require('multer');
var upload = multer({dest: 'uploads'});

module.exports = function(app) {

	var homeController = require('./controllers/home');
	var pageNotFoundController = require('./controllers/page-not-found');
	var errorController = require('./controllers/server-error');
	var apiUpgradeController = require('./controllers/api-upgrade-controller');
	var apiSpendController = require('./controllers/api-spend-controller');

	app.get('/page-not-found', pageNotFoundController.get);
	app.get('/error', errorController.get);
	app.get('/', homeController.get);
	app.get('/api/upgrade/:itemName', apiUpgradeController.get);
	app.get('/api/spend', apiSpendController.get);

	app.use(function(request, response) {
		response.redirect('/page-not-found');
	});
};
