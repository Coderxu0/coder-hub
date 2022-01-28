const errorType = require('../constans/error_types')
const userService = require('../service/user.service')
const AuthService = require('../service/auth.service')
const JWT = require('jsonwebtoken')
const { md5password } = require('../utils/password-handle')
const { PUBLIC_KEY } = require('../app/config')
module.exports = {
  async verifyLogin(ctx, next) {
    //1、获取用户名和密码
    const { username, password } = ctx.request.body
    //2、判断用户名或密码是否为空
    if (!username || !password) {
      const err = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
      ctx.app.emit('error', err, ctx)
      return
    }
    //3.判断用户是否存在
    const result = await userService.getUserName(username)
    const user = result[0]
    if (!user) {
      const err = new Error(errorType.USER_DOES_IS_NOT_EXISTS)
      ctx.app.emit('error', err, ctx)
      return
    }
    console.log(md5password(password) === user.password)
    //4.判断密码是否正确
    if (md5password(password) !== user.password) {
      console.log(111)
      const err = new Error(errorType.PASSWORD_IS_INCORRENT)
      ctx.app.emit('error', err, ctx)
      return
    }
    ctx.user = user
    await next()
  },
  //token验证
  async verifyAuth(ctx, next) {
    //根据请求头获取token
    const authorization = ctx.headers.authorization
    //请求可能未授权(根本就没有token，请求头都没有authorization这个字段)
    if (!authorization) {
      const erro = new Error(errorType.AUTHORIZATION_IS_REQUIRED)
      ctx.app.emit('error', erro, ctx)
      return
    }
    const token = authorization.replace('Bearer ', '')
    try {
      const result = JWT.verify(token, PUBLIC_KEY, {
        algorithms: ["RS256"]
      })
      ctx.user=result
      await next()
    } catch (err) {
      const erro = new Error(errorType.UNAUTHORIZATION)
      ctx.app.emit('error', erro, ctx)
    }

  },
  //权限验证(用户是否修改/删除的是自己的动态...)
  async verifyPermission(ctx, next) {

    //降低耦合度，params传参会传{momentId:?},{commentId:?}......可以通过拿到key去截取字符串得到表名tablename,达到复用效果
    const [resouseKey] = Object.keys(ctx.params)
    const tablename=resouseKey.replace('Id','')
    const resouseId=ctx.params[resouseKey]
    const { id } = ctx.user
    const isPermission = await AuthService.checkResouse(tablename,resouseId, id)
    if (!isPermission[0]) {
      const err = new Error(errorType.UNPERMISSION)
      ctx.app.emit('error', err, ctx)
      return
    }
    await next()
  }


}