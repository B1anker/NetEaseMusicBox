'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _index = require('./api/index.js');

var _index2 = _interopRequireDefault(_index);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa2.default();
const router = (0, _koaRouter2.default)();
const port = 3000;

app.use((0, _koaBodyparser2.default)());

app.use(_index2.default.routes(), _index2.default.allowedMethods());

console.log(`listening in ${port}`);

app.use((0, _koaStatic2.default)(_path2.default.join(__dirname, './../../dist')));

app.listen(port, function (err) {
	if (err) {
		console.log(err);
		return;
	}
});