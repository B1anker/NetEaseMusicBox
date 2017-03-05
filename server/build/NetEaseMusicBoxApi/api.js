'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _search = require('./components/search');

var _search2 = _interopRequireDefault(_search);

var _song = require('./components/song');

var _song2 = _interopRequireDefault(_song);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let api = {
  search: _search2.default,
  song: _song2.default
};

exports.default = api;