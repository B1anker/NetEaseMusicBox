import KoaRouter from 'koa-router';
import NetEaseApi from './netEaseMusicBoxApi/index';
import Signin from './authority/signin.js';

const router = KoaRouter();

router.use('/music', ...NetEaseApi.routes, Signin.routes());

router.use('/music', ...NetEaseApi.methods, Signin.allowedMethods());

export default router;