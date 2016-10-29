'use strict';

var utils = require('../utils/common');
var templateHelpers = require('../templateHelpers.js');
var transationData = require('../data/dummyTransationData');

function createModel(staticData, canonicalUrl) {

	return {
		layout: false,
		data: transationData,
		helpers: templateHelpers,
		canonicalUrl: canonicalUrl,
		uuid: utils.randomGuid()
	};
}

module.exports = function(staticData, canonicalUrl) {
  return createModel(staticData, canonicalUrl);
};
