const Router = require('koa-router')
const {
  createUser,
  getAvatar
} = require('../controller/user.controller')

const {
  verifyUser,
  handlePassword
} = require('../middleware/user.middleware')

const userRouter = new Router({ prefix: '/users' })

userRouter.post('/', verifyUser, handlePassword, createUser)
//通过用户的avatar_url就可以访问改接口
userRouter.get('/:userId/avatar',getAvatar)
module.exports = userRouter