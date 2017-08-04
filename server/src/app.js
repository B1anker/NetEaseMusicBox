import path from 'path'
import api from './api/index.js'
import Koa from 'koa'
import KoaRouter from 'koa-router'
import koaStatic from 'koa-static'
import bodyParser from 'koa-bodyparser'
const app = new Koa()
const router = KoaRouter()
const port = 3000

app.use(bodyParser())

// app.use((ctx, next) => {
// 	console.log(ctx.req.method + ': ' + ctx.req.url)
// 	next()
// })

app.use(koaStatic(
  path.join(__dirname , '../../client/dist')
))



app.use(api.routes(), api.allowedMethods())

console.log(`listening in ${port}`)




app.listen(port, function(err) {
	if (err) {
		console.log(err)
		return
	}
})
