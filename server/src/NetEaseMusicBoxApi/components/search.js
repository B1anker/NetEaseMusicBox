import { globalOption, origin } from "../config";
import { deepCopy, fetchData } from '../util';

/**
 * 搜索api
 * @param {String} [content] [搜索内容]
 * @param {Number} [type] [搜索的类型(1:歌曲;10:专辑;歌手:100;歌单:1000;用户:1002;mv:1004;歌词:1006;主播电台:1009)]
 * @param {Number} [limit] [获取的数量]
 * @param {Number} [offset] [偏移量(分页用)]
 */
const search = (content = null, type = 1, limit = 3, offset = 0) => {
	const option = deepCopy(globalOption);
	const url = `${origin}/api/search/get`;
	const form = {
		s: content,
		limit,
		type,
		offset
	};
	const method = 'POST';
	Object.assign(option, {url, form, method});
	return fetchData(option);
}

module.exports = search;
