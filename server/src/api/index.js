import KoaRouter from 'koa-router';
import Search from './netEaseMusicBoxApi/search';
import Song from './netEaseMusicBoxApi/song';
import Signin from './authority/signin.js';

const router = KoaRouter();
const serachRouter = KoaRouter();
const songRouter = KoaRouter();

serachRouter.get('/netEaseApi/search', async (ctx, next) => {
	ctx.body = await Search(ctx.query.content);
});

songRouter.get('/netEaseApi/song', async (ctx, next) => {
	ctx.body = await Song(ctx.query.id);
});


router.use('/music', serachRouter.routes(), songRouter.routes(), Signin.routes());

router.use('/music', serachRouter.allowedMethods(), songRouter.allowedMethods(), Signin.allowedMethods());

export default router;
