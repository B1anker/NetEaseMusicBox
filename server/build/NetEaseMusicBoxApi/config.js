'use strict';

var origin = 'http://music.163.com';

var globalOption = {
  headers: {
    'Origin': origin,
    'Referer': origin,
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  proxy: false
};

module.exports = { origin: origin, globalOption: globalOption };