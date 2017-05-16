import request from 'request';
import encryptData from './lib/crypto';
import http from 'http';
const deepCopy = obj => JSON.parse(JSON.stringify(obj));
const j = request.jar();

const _request = request.defaults({jar: j});

function req(form, options, cb) {
	const dataType = options.dataType || 'text';
	request({
		url: 'http://music.163.com/' + options.url,
		headers: {
			'Referer': 'http://music.163.com/',
			'Host': 'music.163.com',
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36'
		},
		method: options.method || 'POST',
		form: encryptData(form)
	}, (err, res, result) => {
		if (err) {
			cb(err, result);
			return;
		}
		if (dataType === 'json') {
			if (!result) {
				req(form, options, cb);
				return;
			} else {
				result = JSON.parse(result);
			}
		}
		cb(err, result);
	});
}

function fetchData(options) {
	return new Promise((resolve, reject) => {
		const form = typeof options.form === 'object'
			? JSON.stringify(options.form)
			: options.form;
		req(form, options, (err, result) => {
			if (err) {
				reject(err)
			}
			resolve(result)
		});
	});
}

function toArray(obj) {
	const result = [];
	for (let key of Object.keys(obj)) {
		obj[key] && result.push(obj[key]);
	}
	return result;
}

export {deepCopy, fetchData, toArray};
