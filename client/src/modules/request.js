import axios from 'axios';

function signin(params) {
	return axios.post('/music/authority/signin', params);
}

export {
	signin
}
