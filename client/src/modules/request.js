import axios from 'axios';

function signin(params) {
	return axios.post('/music/authority/signin', params);
}

function search(content) {
	return axios.get(`/music/netEaseApi/song?content=${content}`);
}

function detail(id) {
	return axios.get(`/music/netEaseApi/detail?id=${id}`);
}

function getMp3Url(id) {
	return axios.get(`/music/netEaseApi/song?id=${id}`);
}


export {
	signin,
	search,
	detail,
	getMp3Url
}
