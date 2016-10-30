'use strict';

var multer = require('multer');
var upload = multer({dest: 'uploads'});

module.exports = function(app) {

	var homeController = require('./controllers/home');
	var makeTransactionsController = require('./controllers/make-transactions-controller');
	var pageNotFoundController = require('./controllers/page-not-found');
	var errorController = require('./controllers/server-error');
	var apiUpgradeController = require('./controllers/api-upgrade-controller');
	var apiSpendController = require('./controllers/api-spend-controller');
	var apiMakeTransactionsController = require('./controllers/api-make-transactions-controller');
	var apiGetMoreMoneyController = require('./controllers/api-get-more-money-controller');

	app.get('/page-not-found', pageNotFoundController.get);
	app.get('/error', errorController.get);
	app.get('/', homeController.get);
	app.get('/make-transaction', makeTransactionsController.get);
	app.get('/api/upgrade/:itemName', apiUpgradeController.get);
	app.get('/api/spend', apiSpendController.get);
	app.get('/api/alternativeincome', apiAlternativeIncomeController.get);
	app.post('/api/make-transactions', apiMakeTransactionsController.post);
	app.get('/api/getMoreMoney', apiGetMoreMoneyController.get);


	app.use(function(request, response) {
		response.redirect('/page-not-found');
	});
};
