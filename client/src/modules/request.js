import axios from 'axios';

function signin(params) {
	return axios.post('/music/authority/signin', params);
}

function search(id) {
	return axios.get(`/music/netEaseApi/song?id=${id}`);
}


export {
	signin,
	search
}
