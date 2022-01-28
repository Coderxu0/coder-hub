const connection = require('../app/database')
class FileService {
  //向头像表中插入头像信息
  async createAvatar(mimetype, filename, size, userId) {
    const statement = `REPLACE INTO avatar(mimetype,filename,size,user_id)VALUES(?,?,?,?)`
    const result = await connection.execute(statement, [mimetype, filename, size, userId])
    return result[0]
  }
  //根据用户id从数据库中取出头像信息
  async getAvatar(userId){
    const statement=`SELECT * FROM avatar WHERE user_id=?`
    const [result]=await connection.execute(statement,[userId])
    return result[0]
  }
  //更新用户表中的avatar_url字段
  async updateAvatarUrlById(avatarUrl,userId){
    const statement=`UPDATE users SET avatar_url=? WHERE id=?`
    const result= await connection.execute(statement,[avatarUrl,userId])
    return result[0]
  }
  async createPicture(filename,mimetype,size,user_id,moment_id){
    const statement=`INSERT INTO file(filename,mimetype,size,user_id,moment_id)VALUES(?,?,?,?,?)`
    const result=await connection.execute(statement,[filename,mimetype,size,user_id,moment_id])
    return result[0]
  }
  async getFileByFilename(filename){
    const statement=`SELECT * FROM file WHERE filename= ?`
    const [result]=await connection.execute(statement,[filename])
    return result[0]
  }
}
module.exports = new FileService()