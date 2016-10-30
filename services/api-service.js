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

function apiRequestPost(formData) {
  return new Promise(function(resolve, reject) {
    request.post(options, function (error, httpResponse, body) {

      if (!error && httpResponse.statusCode === 200) {
        resolve(body);
      }

    })
  });
}

apiService.getTransactions = function() {
  options.url = `${API_URL}/transactions`;

  return apiRequest();
}

apiService.getSummary = function() {
  options.url = `${API_URL}/summary`;

  return apiRequest();
}

apiService.getUpgradeData = function(itemName) {
  options.url = `${API_URL}/upgrade/${itemName}`

  return apiRequest();
}

apiService.getSpendData = function() {
  options.url = `${API_URL}/spend/`;

  return apiRequest();
}

apiService.sendTransactions = function(formData) {
  options.url =  `${API_URL}/userdata/`;
  options.body = formData;

  return apiRequestPost();
}

apiService.getMoreMoney = function() {
  options.url = `${API_URL_DEV}/alternativeincome/`;

  return apiRequest();
}
