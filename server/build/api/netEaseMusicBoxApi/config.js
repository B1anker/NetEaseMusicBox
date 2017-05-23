'use strict';

const referer = 'http://music.163.com';

const globalOption = {
	headers: {
		Referer: referer,
		Host: 'music.163.com'
	},
	proxy: false
};

module.exports = { referer, globalOption };