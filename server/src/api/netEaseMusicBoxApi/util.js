import request from 'request';
import encryptData from './lib/crypto';

const deepCopy = obj => JSON.parse(JSON.stringify(obj));

const fetchData = (options) => {
	const dataType = options.dataType || 'text';

	return new Promise((resolve, reject) => {
		const referer = 'http://music.163.com/';
		const form = typeof options.form === 'object' ? JSON.stringify(options.form) : options.form;

		request({
			url: referer + options.url,
			headers: {
				Referer: referer,
				Host: 'music.163.com',
				Cookie: options.cookie,
			},
			method: 'POST',
			form: encryptData(form)
		}, (err, res, result) => {
			if (err) return reject(err);
			if (dataType === 'json') {
				try {
					result = JSON.parse(result);
				} catch (e) {
					return reject(e);
				}

				return resolve(result);
			}

			resolve(result);
		});
	});
}

const toArray = (obj) => {
	const result = [];
	for (let key of Object.keys(obj)) {
		obj[key] && result.push(obj[key]);
	}
	return result;
}

export {
	deepCopy,
	fetchData,
	toArray
};
