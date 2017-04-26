import axios from 'axios';

function signin(params) {
	return axios.post('/music/netEaseApi/login', params);
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


export {
	signin,
	search,
	detail,
	getMp3Url,
	lyric,
	subcount,
	getFollows,
	getFolloweds,
	getHotPlayList,
	getBanner,
	getNewBanner,
	getPlayLists,
	getUserDetail,
	userPlayListsApi,
	getEvent
}
