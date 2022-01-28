const MomentService = require('../service/moment.service')
const FileService = require('../service/file.service')
const fs = require('fs')
class MomentCotroller {
  //登录成功后会根据用户信息颁发token，客户端拿到token后再请求写内容时，会携带token
  //调用create前就会验证token成功了之后会把验证的结果(包含用户信息) 作为user对象赋给ctx.user
  async create(ctx, next) {
    try {
      const id = ctx.user.id;
      const content = ctx.request.body.content
      const result = await MomentService.createMoment(id, content)
      ctx.body = result
    } catch (err) {
      const error = new Error(errorType.QUERY_OR_PARAMS_IS_INCORRENT)
      ctx.app.emit('error', error, ctx)
    }

  }
  //游客查询单个内容
  async detail(ctx, next) {
    try {
      const momentId = ctx.params.momentId
      const result = await MomentService.getMomentById(momentId)
      ctx.body = result[0]
    } catch (err) {
      const error = new Error(errorType.QUERY_OR_PARAMS_IS_INCORRENT)
      ctx.app.emit('error', error, ctx)
    }

  }
  //游客分页获取数据
  async list(ctx, next) {
    try {
      const { offset, size } = ctx.query
      const result = await MomentService.getMomentList(offset, size)
      ctx.body = result
    } catch (err) {
      const error = new Error(errorType.QUERY_OR_PARAMS_IS_INCORRENT)
      ctx.app.emit('error', error, ctx)
    }

  }

  //用户修改动态
  async update(ctx, next) {
    try {

      const { momentId } = ctx.params
      const content = ctx.request.body.content
      const result = await MomentService.updateMoment(content, momentId)
      ctx.body = result[0]
    } catch (err) {
      const error = new Error(errorType.QUERY_OR_PARAMS_IS_INCORRENT)
      ctx.app.emit('error', error, ctx)
    }

  }

  //用户删除动态
  async del(ctx, next) {
    try {
      const { momentId } = ctx.params
      const result = await MomentService.deleteMoment(momentId)
      ctx.body = result[0]
    } catch (err) {
      const error = new Error(errorType.QUERY_OR_PARAMS_IS_INCORRENT)
      ctx.app.emit('error', error, ctx)
    }
  }

  //添加标签
  async addLabels(ctx, next) {
    try {
      const result = []
      const { momentId } = ctx.params
      const labels = ctx.LabelsArr
      //这里还要做判断，判断给文章添加的标签是否对该文章已经添加过了
      for (let label of labels) {
        const hasResult = await MomentService.hasLabel(momentId, label.id)
        if (!hasResult) {
          const addResult = await MomentService.addLabel(momentId, label.id)
          result.push(addResult)
        }
      }
      ctx.body = result
    } catch (err) {
      const error = new Error(errorType.QUERY_OR_PARAMS_IS_INCORRENT)
      ctx.app.emit('error', error, ctx)
    }
  }
  async fileInfo(ctx, next) {
    let { filename } = ctx.params
    const fileInfo = await FileService.getFileByFilename(filename)
    ctx.response.set('content-type', fileInfo.mimetype)
    //传入的filename拼接路径 找出文件夹中的图片数据
    //如果传了图片大小的参数type= small large middle,就将读取的filename拼接对应的后缀找出对应大小的文件数据
    const { type } = ctx.query
    const types = ["small", "middle", "large"]
    if (types.some(item => item === type)) {
      filename = filename + '-' + type
    }
    //如果没有传参 就返回默认大小的图片
    ctx.body = fs.createReadStream(`./uploads/picture/${filename}`)
  }

}
module.exports = new MomentCotroller()