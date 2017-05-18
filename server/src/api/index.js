import KoaRouter from 'koa-router';
import NetEaseApi from './netEaseMusicBoxApi/index';
import Signin from './authority/signin';
import historyApi from './play-history/index';

const router = KoaRouter();

router.use('/music', ...NetEaseApi.routes, Signin.routes(), ...historyApi.routes);

router.use('/music', ...NetEaseApi.methods, Signin.allowedMethods(), ...historyApi.methods);


export default router;
