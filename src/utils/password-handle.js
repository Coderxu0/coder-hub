const crypto=require('crypto')
module.exports={
  md5password(password){
    const md5=crypto.createHash('md5')
    //传入'hex'按16进制的转成字符串
   const result= md5.update(password).digest('hex')
   return result
  }
}