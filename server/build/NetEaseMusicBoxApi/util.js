'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.fetchData = exports.deepCopy = undefined;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const deepCopy = obj => JSON.parse(JSON.stringify(obj));

const fetchData = option => {
	return new Promise((resolve, reject) => {
		(0, _request2.default)(option, (err, res, body) => {
			if (!err && res.statusCode == 200) {
				let info = JSON.parse(body);
				resolve(info);
			} else {
				reject(err);
			}
		});
	});
};

exports.deepCopy = deepCopy;
exports.fetchData = fetchData;