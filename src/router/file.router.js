const Router=require('koa-router')
const {
  avatarHandler,
  pictureHandler
}=require('../middleware/file.middleware')
const{
  saveAvatarInfo,
  savePictureInfo,
}=require('../controller/file.controller')
const {
  verifyAuth,
  verifyPermission,
}=require('../middleware/auth.middleware')
const{
  pictureResize
}=require('../middleware/file.middleware')
const fileRouter=new Router({prefix:'/upload'})
//1.现将图片信息保存到upload/avatar
//2.将其相关信息保存到数据库同时为user的avatar_url添加地址
fileRouter.post('/avatar',verifyAuth,avatarHandler,saveAvatarInfo)
//1.是否登陆 2.是否为自己的图片配图 3.将图片数据写入文件 4.文件中的图片尺寸进行调整，增加三个尺寸 5.将图片信息和文章id用户id等存入数据库
fileRouter.post('/:momentId/picture',verifyAuth,verifyPermission,pictureHandler,pictureResize,savePictureInfo)
module.exports=fileRouter