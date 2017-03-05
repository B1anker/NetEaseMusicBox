'use strict';

var _api = require('./NetEaseMusicBoxApi/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_api2.default.song);
_api2.default.search('年度之歌').then(res => {
	let song = res.result.songs[0].id;
	_api2.default.song(song).then(res => {
		console.log(song);
	});
});