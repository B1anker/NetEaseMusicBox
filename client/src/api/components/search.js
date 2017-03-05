import {origin, globalOption} from '../config';
import {deepCopy} from '../util';
import axios from 'axios';

const search = (name = null, callback = null, onlySong = true, limit = 3, offset = 0) => {
	const option = deepCopy(globalOption);
	const url = `${origin}/api/search/get`;
	const form = {
		s: name,
		limit,
		type: 1,
		offset
	};
	const method = 'POST';
	Object.assign(option, {url, form, method});
	axios({
		method,
		url,
		headers: {
	    'Origin': '*',
	    'Content-Type': 'application/x-www-form-urlencoded'
	  },
	  proxy: false,
		data: {
			form
		}
	}).then((res) => {
		console.log(res);
	}).catch((err) => {
		console.log(err);
	});
	// request(option, (err, res, body) => {
	//   if (!err && res.statusCode == 200) {
	//     let info = JSON.parse(body)
	//     let data
	//     if(onlySong){
	//       data=info.result.songs
	//     }else{
	//       data={songs:info.result.songs,mvs:info.result.mvs}
	//     }
	//     callback&&callback(JSON.stringify(data,'',2))
	//   } else {
	//     console.error(err)
	//   }
	// });
}

module.exports =  search;
