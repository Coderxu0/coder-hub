const userService = require('../service/user.service')
const fileService=require('../service/file.service')
const fs=require('fs')
class UserController {
  async createUser(ctx, next) {
    try {
      //获取用户传递参数
      const user = ctx.request.body
      //调用业务去查询数据库
      let result = await userService.createUser(user)

      //返回数据
      ctx.body = result
    } catch (err) {
      const error = new Error(errorType.QUERY_OR_PARAMS_IS_INCORRENT)
      ctx.app.emit('error', error, ctx)
    }
  }

  async getAvatar(ctx,next){
    const {userId}=ctx.params
    //从数据库中取出文件相关信息
    const avatarInfo=await fileService.getAvatar(userId)
    //根据保存在数据库中的文件相关信息取出保存在文件中的图像文件返回流
    //设置content-type
    ctx.response.set('content-type',avatarInfo.mimetype)
    ctx.body=fs.createReadStream(`./uploads/avatar/${avatarInfo.filename}`)
  }

}

module.exports = new UserController()