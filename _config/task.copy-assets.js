/* jshint node: true */

'use strict';

function getTaskConfig(projectConfig) {
	var taskConfig = {
		// build: {
		// 	src: projectConfig.dirs.dest,
		// 	dest: projectConfig.dirs.build
		// },
		// fonts: {
		// 	src: projectConfig.dirs.src + '/fonts/',
		// 	dest: projectConfig.dirs.dest + '/fonts/'
		// },
		// media: {
		// 	src: projectConfig.dirs.src + '/media/',
		// 	dest: projectConfig.dirs.dest + '/media/'
		// }
	};

	return taskConfig;
}

module.exports = getTaskConfig;
