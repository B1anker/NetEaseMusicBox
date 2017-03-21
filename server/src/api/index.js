// const Api = require('./netEaseMusicBoxApi/index');
// const api = new Api();
// // api.search('周杰伦').then((res) => {
// // 	console.log(res.result.songs);
// // });
// api.mp3Url(418603077).then((res) => {
// 	console.log(res);
// });
import KoaRouter from 'koa-router';
import NetEaseApi from './netEaseMusicBoxApi/index';
import Signin from './authority/signin.js';

const router = KoaRouter();

router.use('/music', ...NetEaseApi.routes, Signin.routes());

router.use('/music', ...NetEaseApi.methods, Signin.allowedMethods());

export default router;
