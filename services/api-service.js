var transationData = require('../data/dummyTransationData');

var apiService = module.exports;
var API_URL = 'http://itsjustaname-api.apphb.com';

var request = require('request');
var options = {
  json: true
}

apiService.getTransactions = function(callback) {
  options.url = API_URL + '/transactions';

  request(options, function (error, response, json) {

      if (!error && response.statusCode === 200) {
        callback(json);
      }

  })
}
