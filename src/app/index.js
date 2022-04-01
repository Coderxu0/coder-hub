const koa =require('koa')
const bodyParser=require('koa-bodyparser')
const useRouters=require('../router')
const errorHandler=require('./error-handles')

const app=new koa()

app.use(bodyParser())
//先将 useRouters方法加到app身上，再调用
app.useRouters=useRouters
app.useRouters()

app.on('error',errorHandler)

module.exports=app