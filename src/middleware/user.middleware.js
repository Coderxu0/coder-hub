const errTypes = require('../constans/error_types')
const userService = require('../service/user.service')
const { md5password } = require('../utils/password-handle')
module.exports = {
  //校验用户密码是否规范，用户名是否冲突
  async verifyUser(ctx, next) {
    //1.获取用户名和密码
    const { username, password } = ctx.request.body
    //2.判断用户名或密码格式
    const regUsername = new RegExp(/^[a-zA-Z][a-zA-Z0-9_]{4,14}$/)  //5-15位
    const regPassword = new RegExp(/^[a-zA-Z][a-zA-Z0-9_]{7,14}$/)  //8-15位

    if (!regUsername.test(username) || !regPassword.test(password)) {
      const err = new Error(errTypes.NAME_OR_PASSWORD_IS_INCORRENT)
      ctx.app.emit('error', err, ctx)
      return
    }
    //3.判断这次用户注册的用户名是否被注册过
    const result = await userService.getUserName(username)
    //如果长度大于0证明已经存在 否则不存在可以建立用户
    if (result.length) {
      const err = new Error(errTypes.USER_ALREADY_EXISTS)
      ctx.app.emit('error', err, ctx)
      return
    }
    //这里要加await 等后面的异步回调都执行完
    await next()
  },
  //将密码加密处理
  async handlePassword(ctx, next) {
    const { password } = ctx.request.body
    ctx.request.body.password = md5password(password)
    await next()
  }
}