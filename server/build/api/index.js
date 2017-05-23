'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _index = require('./netEaseMusicBoxApi/index');

var _index2 = _interopRequireDefault(_index);

var _signin = require('./authority/signin');

var _signin2 = _interopRequireDefault(_signin);

var _index3 = require('./play-history/index');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

const router = (0, _koaRouter2.default)();

router.use.apply(router, ['/music'].concat(_toConsumableArray(_index2.default.routes), [_signin2.default.routes()], _toConsumableArray(_index4.default.routes)));

router.use.apply(router, ['/music'].concat(_toConsumableArray(_index2.default.methods), [_signin2.default.allowedMethods()], _toConsumableArray(_index4.default.methods)));

exports.default = router;