import axios from 'axios';

function signin(params) {
	return axios.post('/music/netEaseApi/login', params);
}

function refresh() {
	return axios.get('/music/netEaseApi/refresh');
}

function search(content) {
	return axios.get(`/music/netEaseApi/search?content=${content}`);
}

function detail(id) {
	return axios.get(`/music/netEaseApi/detail?id=${id}`);
}

function getMp3Url(id) {
	return axios.get(`/music/netEaseApi/song?id=${id}`);
}

function getMp3Comments(id) {
	return axios.get(`/music/netEaseApi/song/comment?id=${id}`);
}

function lyric(id) {
	return axios.get(`/music/netEaseApi/lyric?id=${id}`);
}

function subcount(id) {
	return axios.get(`/music/netEaseApi/subcount?id=${id}`);
}

function getFollows(params) {
	return axios.post(`/music/netEaseApi/getFollows`, params);
}

function getFolloweds(id) {
	return axios.get(`/music/netEaseApi/getFolloweds?id=${id}`);
}

function getHotPlayList() {
	return axios.get('/music/netEaseApi/hotplaylist');
}

function getBanner() {
	return axios.get('/music/netEaseApi/banner');
}

function getNewBanner() {
	return axios.get('/music/netEaseApi/newBanner').then((res) => {
		return res.data.match(/Gbanners[\S\s]*\;/)[0].replace(/\s/g, '').match(/picUrl.*?jpg\"/g).map((item, index, arr) => {
			return item.match(/http.*jpg/)[0];
		});
	});
}

function getRankingList(id) {
	return axios.get(`/music/netEaseApi/rankingList?id=${id}`)
}

function getPlayLists(id) {
	return axios.get(`/music/netEaseApi/playList?playListId=${id}`);
}

function getUserDetail(id) {
	return axios.get(`/music/netEaseApi/userDetail?id=${id}`);
}

function userPlayListsApi(id) {
	return axios.get(`/music/netEaseApi/userPlayLists?id=${id}`);
}

function getEvent(params) {
	if (!params) {
		return axios.get('/music/netEaseApi/event');
	}
	return axios.get(`/music/netEaseApi/event?offset=${ params.offset }&limit=${ params.limit }`);
}

function getNewEvent(params) {
	if (!params) {
		return axios.get('/music/netEaseApi/newEvent');
	}
	return axios.get(`/music/netEaseApi/newEvent?offset=${ params.offset }&limit=${ params.limit }`);
}

function dailySign(type) {
	return axios.get(`/music/netEaseApi/dailySign?type=${type}`);
}

function getMvUrl(type) {
	return axios.get(`/music/netEaseApi/dailySign?type=${type}`);
}

function history(type, params) {
	return axios.post(`/music/history/${type}`, params);
}


export {
	signin,
	refresh,
	search,
	detail,
	getMp3Url,
	getMp3Comments,
	lyric,
	subcount,
	getFollows,
	getFolloweds,
	getHotPlayList,
	getBanner,
	getNewBanner,
	getRankingList,
	getPlayLists,
	getUserDetail,
	userPlayListsApi,
	getEvent,
	getNewEvent,
	getMvUrl,
	dailySign,
	history
}
