const connection=require('../app/database')
class UserService{
  //创建用户
  async createUser(user){
    //拿到用户对象，解构
    const {username,password}=user
    //sql语句
    const statement=`INSERT INTO users(name,password) VALUES (?,?);`
    //查询数据库
    const result=await connection.execute(statement,[username,password])
    //返回结果
    return result
  }
  //查询用户名
  async getUserName(name){
    const statement=`SELECT * FROM users WHERE name=?`
    //查询记录会将所有符合的返回一个数组[[{第一条记录},{第二条记录}...],[{字段1},{字段2},{字段3}...]]
    const result =await connection.execute(statement,[name])
    return result[0]
  }
}
module.exports=new UserService()