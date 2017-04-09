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


export {
	signin,
	search,
	detail,
	getMp3Url,
	lyric
}
