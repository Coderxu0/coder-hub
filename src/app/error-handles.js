const errTypes = require('../constans/error_types')
const errorHandler = function (error, ctx) {
  let status, message
  switch (error.message) {
    case errTypes.NAME_OR_PASSWORD_IS_INCORRENT:
      status = 400  //Bad Request
      message = '用户名或密码不符合格式'
      break
    case errTypes.USER_ALREADY_EXISTS:
      status = 409 //conflict
      message = '用户已存在'
      break
    case errTypes.USER_DOES_IS_NOT_EXISTS:
      status = 400
      message = '用户名不存在'
      break
    case errTypes.PASSWORD_IS_INCORRENT:
      status = 400
      message = '用户密码错误'
      break
    case errTypes.UNAUTHORIZATION:
      status = 401  //未授权 (token不对)
      message = '无效的token'
      break
    case errTypes.AUTHORIZATION_IS_REQUIRED:
      status = 401  //未授权 (没有携带token)
      message = '请携带token'
      break
    case errTypes.UNPERMISSION:
      status = 401  //未授权 (没有携带token)
      message = '没有权限'
      break
    case errTypes.QUERY_OR_PARAMS_IS_INCORRENT:
      status = 500  
      message = '执行出错'
      break
    default:
      status = 404
      message = 'NOT FOUND'
  }
  console.log('发射器执行回调')
  ctx.status = status
  ctx.body = message
  console.log(ctx.status, ctx.body)
}
module.exports = errorHandler