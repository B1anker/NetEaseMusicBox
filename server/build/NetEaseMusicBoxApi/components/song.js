'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _config = require('../config');

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var song = function song(id) {
  var option = (0, _util.deepCopy)(_config.globalOption);
  var url = _config.origin + '/api/song/detail?ids=%5B' + id + '%5d';
  var method = 'GET';
  (0, _assign2.default)(option, { url: url, method: method });
  return (0, _util.fetchData)(option);
};
exports.default = song;