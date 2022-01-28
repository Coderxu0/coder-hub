const connection=require('../app/database')
//对于是由具有权限去操作数据，而去查询数据库
class AuthService{
  async checkResouse(tablename,resouseId,userId){
    const statement=`SELECT * FROM ${tablename} WHERE id=? AND user_id=?`
    const result =await connection.execute(statement,[resouseId,userId])
    return result[0]
  }
}
module.exports=new AuthService()