import KoaRouter from 'koa-router';
import Search from './components/search';
import Song from './components/song';

const router = KoaRouter();
const serachRouter = KoaRouter();
const songRouter = KoaRouter();
const testRouter = KoaRouter();

serachRouter.get('/search', async (ctx, next) => {
	ctx.body = await Search(ctx.query.content);
});

songRouter.get('/song', async (ctx, next) => {
	ctx.body = await Song(ctx.query.id);
});

testRouter.post('/signin', async (ctx, next) => {
	console.log(ctx.request.body);
	ctx.body = ctx;
});

router.use('/music', serachRouter.routes(), songRouter.routes(), testRouter.routes());

router.use('/music', serachRouter.allowedMethods(), songRouter.allowedMethods(), testRouter.allowedMethods());


export default router;
