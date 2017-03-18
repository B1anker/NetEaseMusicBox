import axios from 'axios';

function signin(params) {
	return axios.post('/music/signin', params);
}

export {
	signin
}
