var apiService = module.exports;
var request = require('request');

var API_URL = 'http://itsjustaname-api.apphb.com';
var options = {
  json: true
}

apiService.getTransactions = function() {
  options.url = API_URL + '/transactions';

  return new Promise(function(resolve, reject) {
    request(options, function (error, response, json) {

        if (!error && response.statusCode === 200) {
          resolve(json);
        }

    })
  });
}

apiService.getSummary = function() {
  options.url = API_URL + '/summary';

  return new Promise(function(resolve, reject) {
    request(options, function (error, response, json) {

        if (!error && response.statusCode === 200) {
          resolve(json);
        }

    })
  });
}
