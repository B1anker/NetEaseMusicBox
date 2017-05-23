'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = [],
      methods = [];

_fs2.default.readdirSync(__dirname).filter(value => {
	//过滤自身
	return value !== 'index.js';
}).map(value => require('./' + value).default).forEach(value => {
	routes.push(value.routes());
	methods.push(value.allowedMethods());
});

exports.default = {
	routes,
	methods
};