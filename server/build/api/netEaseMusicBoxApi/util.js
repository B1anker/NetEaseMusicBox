'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.toArray = exports.fetchData = exports.deepCopy = undefined;

var _request2 = require('request');

var _request3 = _interopRequireDefault(_request2);

var _crypto = require('./lib/crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const deepCopy = obj => JSON.parse(JSON.stringify(obj));
const j = _request3.default.jar();

const _request = _request3.default.defaults({ jar: j });

function req(form, options, cb) {
	const dataType = options.dataType || 'text';
	(0, _request3.default)({
		url: 'http://music.163.com/' + options.url,
		headers: {
			'Referer': 'http://music.163.com/',
			'Host': 'music.163.com',
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36'
		},
		method: options.method || 'POST',
		form: (0, _crypto2.default)(form)
	}, (err, res, result) => {
		if (err) {
			cb(err, result);
			return;
		}
		if (dataType === 'json') {
			if (!result) {
				req(form, options, cb);
				return;
			} else {
				console.log(options.url);
				result = JSON.parse(result);
			}
		}
		cb(err, result);
	});
}

function fetchData(options) {
	return new Promise((resolve, reject) => {
		const form = typeof options.form === 'object' ? JSON.stringify(options.form) : options.form;
		req(form, options, (err, result) => {
			if (err) {
				reject(err);
			}
			resolve(result);
		});
	});
}

function toArray(obj) {
	const result = [];
	for (let key of Object.keys(obj)) {
		obj[key] && result.push(obj[key]);
	}
	return result;
}

exports.deepCopy = deepCopy;
exports.fetchData = fetchData;
exports.toArray = toArray;