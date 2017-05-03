import Encrypt from './crypto';
import http from 'http';
import crypto from 'crypto';
import tough from 'tough-cookie';
const Cookie = tough.Cookie;

function createWebAPIRequest(path, data, cookie, response, method, cb) {
	let music_req = '';
	let cryptoreq = Encrypt(data);
	let http_client = http.request({
		hostname: 'music.163.com',
		method: method,
		path: path,
		headers: {
			'Accept': '*/*',
			'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
			'Connection': 'keep-alive',
			'Content-Type': 'application/x-www-form-urlencoded',
			'Referer': 'http://music.163.com',
			'Host': 'music.163.com',
			'Cookie': cookie,
			'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
		}
	}, (res) => {
		res.on('error', function(err) {
			response.status(502).send('fetch error');
		});
		res.setEncoding('utf8');
		if (res.statusCode != 200) {
			createWebAPIRequest(path, data, cookie, response, method, cb);
		} else {
			res.on('data', function(chunk) {
				music_req += chunk;
			});
			res.on('end', function() {
				if (music_req === '') {
					createWebAPIRequest(path, data, cookie, response, method, cb);
					return;
				}
				cb && cb(JSON.parse(music_req));
				if (res.headers['set-cookie']) {
					response.set({'Set-Cookie': res.headers['set-cookie']});
					return;
				}
			})
		}
	});

	http_client.write('params=' + cryptoreq.params + '&encSecKey=' + cryptoreq.encSecKey);
	http_client.end();
}

function req(options){
	options.method = options.method ? options.method : "POST";
	return new Promise((resolve, reject) => {
		createWebAPIRequest(options.url, options.form, options.cookie, options.response, options.method, (_data) => {
			resolve(_data);
		});
	})
}

export {req}
