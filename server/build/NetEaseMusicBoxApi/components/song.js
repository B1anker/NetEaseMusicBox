'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _config = require('../config');

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const song = id => {
  const option = (0, _util.deepCopy)(_config.globalOption);
  const url = `${_config.origin}/api/song/detail?ids=%5B${id}%5d`;
  const method = 'GET';
  Object.assign(option, { url, method });
  return (0, _util.fetchData)();
};
exports.default = song;