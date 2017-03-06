import axios from 'axios';

function signin(params) {
	axios.post('/music/signin', params);
}

export {
	signin
}
