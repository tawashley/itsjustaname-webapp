var apiService = module.exports;
var request = require('request');

var API_URL = 'http://itsjustaname-api.apphb.com';
var API_URL_DEV = 'http://itsjustaname-api-dev.apphb.com';
var options = {
  json: true
}

function apiRequest() {
  return new Promise(function(resolve, reject) {
    request(options, function (error, response, json) {

        if (!error && response.statusCode === 200) {
          resolve(json);
        }

    })
  });
}

apiService.getTransactions = function() {
  options.url = `${API_URL_DEV}/transactions`;

  return apiRequest();
}

apiService.getSummary = function() {
  options.url = `${API_URL}/summary`;

  return apiRequest();
}

apiService.getUpgradeData = function(itemName) {
  options.url = `${API_URL_DEV}/upgrade/${itemName}`

  return apiRequest();
}

apiService.getSpendData = function() {
  options.url = `${API_URL_DEV}/spend/`;

  return apiRequest();
}
