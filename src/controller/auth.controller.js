const JWT=require('jsonwebtoken')
const {PRIVATE_KEY}=require('../app/config')
class authController{
  //颁发token
  async login(ctx,next){
    const{id,name}=ctx.user
      const token= JWT.sign({id,name},PRIVATE_KEY,{
        expiresIn:60*60*24,
        algorithm:'RS256'
      })
    ctx.body={
      id,
      name,
      token
    }
  }
}
module.exports=new authController()