'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _set = require('./set');

var _set2 = _interopRequireDefault(_set);

var _get = require('./get');

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	routes: [_set2.default.routes(), _get2.default.routes()],
	methods: [_set2.default.allowedMethods(), _get2.default.allowedMethods()]
};