const Multer=require('koa-multer')
const Jimp=require('jimp')
const path=require('path')
const avatarUpload=Multer({
  dest:'./uploads/avatar'
})
// 上传图片的key为avatar
const avatarHandler=avatarUpload.single('avatar')

const pictureUpload=Multer({
  dest:'./uploads/picture'
})
// 一个动态最多配9张图
const pictureHandler=pictureUpload.array('picture',9)
module.exports={
  avatarHandler,
  pictureHandler,
  async pictureResize(ctx,next){
    //1.获取所有的图像信息
    const files=ctx.req.files;
    //2.对图像处理
    for(let file of files){
      const destPath=path.join(file.destination,file.filename)
      Jimp.read(file.path).then(image=>{
        image.resize(1280,Jimp.AUTO).write(`${destPath}-large`)
        image.resize(640,Jimp.AUTO).write(`${destPath}-middle`)
        image.resize(320,Jimp.AUTO).write(`${destPath}-small`)
      })
    }
    await next()
  }
}