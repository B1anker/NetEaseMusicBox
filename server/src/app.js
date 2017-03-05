import api from './NetEaseMusicBoxApi/api.js';
import Koa from 'koa';
import KoaRouter from 'koa-router';
import bodyParser from 'koa-bodyparser';
const app = new Koa();
const router = KoaRouter();
const port = 3000;

app.use(bodyParser());

app.use(api.routes(), api.allowedMethods());

console.log(`listening in ${port}`);

app.listen(port, function(err) {
	if (err) {
		console.log(err)
		return
	}
})
