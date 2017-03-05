import request from 'request';

const deepCopy = obj => JSON.parse(JSON.stringify(obj));

const fetchData = (option) => {
	return new Promise((resolve, reject) => {
		request(option, (err, res, body) => {
			if (!err && res.statusCode == 200) {
				let info = JSON.parse(body);
				resolve(info);
			} else {
				reject(err);
			}
		});
	});
}

export {
	deepCopy,
	fetchData
};
