const {
  APP_HOST,
  APP_PORT
}=require('../app/config')
const FileService=require('../service/file.service')
class FileController{
  //上传头像(把头像文件信息存储到数据库中，把头像地址存储到(更新)用户表avatar_url中)
  async saveAvatarInfo(ctx,next){
    //1.获取图像信息和用户id
    const {mimetype,filename,size}=ctx.req.file
    const {id}=ctx.user
    //2.将图像信息保存到数据库中(在上一个中间件中已经把图像数据存到文件中了)
    const result=await FileService.createAvatar(mimetype,filename,size,id)
    //3.将图片地址保存到users表中的 avatar_url中 同时update用户的avatar_url
    const avatar_url=`${APP_HOST}:${APP_PORT}/users/${id}/avatar`
    //重复提交数据库汇总记录的文件信息是最后一次提交的   所以根据拼接的路径访问取头像的接口时 拿到的也是最新的
    await FileService.updateAvatarUrlById(avatar_url,id)
    
    ctx.body=result
  }
  async savePictureInfo(ctx,next){
    const result=[]
    //1.获取图像信息
    const files=ctx.req.files
    const {id}=ctx.user
    const {momentId}=ctx.params
    for(let file of files){
      const {mimetype,filename,size}=file
      const r=await FileService.createPicture(filename,mimetype,size,id,momentId)
      result.push(r)
    }
    ctx.body=result
  }
}
module.exports=new FileController()

//存入头像时根据用户id 和图片信息存入，将图片文件数据保存在uploads/avatar文件夹中，将头像文件的相关信息(filename,mimetype等)和用户id存入数据库
//存入头像的同时为用户的avatar_url添加头像的url localhost:8000/upload/用户id/avatar
//取出头像时接口满足上面举例的路径，根据params传参取得用户id，从数据库中取出头像信息包括filname，根据filename再从文件夹中取出图片数据 返回

//存入动态配图时同时存用户id动态id和图片信息，将图片文件数据保存在uploads/picture文件夹中，将配图文件的相关信息(filename,mimetype等)和用户id动态id存入数据库
//在查询动态详情时会返回我们根据filename拼接好的图片地址
//取出图片时接口满足上面举例的路径，根据params传参取得图片的filename，从数据库中取出头像信息，根据filename再从文件夹中取出图片数据 返回