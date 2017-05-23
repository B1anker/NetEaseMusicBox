'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _operate = require('./operate');

var _operate2 = _interopRequireDefault(_operate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const db = new _operate2.default('neteasemusicbox');

exports.default = db;