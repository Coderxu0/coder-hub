const connection=require('../app/database')
class LaberService{
  async createLabel(LabelName){
    console.log(1)
    const statement=`INSERT INTO label (name) VALUES (?)`
    const result=await connection.execute(statement,[LabelName])
    return result[0]
  }
  async getLabelByName(name){
    const statement=`SELECT * FROM label WHERE name=?`
    const [result]=await connection.execute(statement,[name])
    //如果有数据就返回true否则返回false
    return result[0]
  }
  async getLabelList(userId,offset,size){
    const statement=`SELECT  DISTINCT(name),l.id id FROM label l
    JOIN moment_label ml ON l.id=ml.label_id
   JOIN moment m ON m.id=ml.moment_id
   WHERE m.user_id=?
   LIMIT ?,?`
    const result=await connection.execute(statement,[userId,offset,size])
    return result[0]
  }

  async getMomentByLabel(userId,labelId) {
    console.log(userId,labelId)
    const statement = `SELECT m.id momentId,content,user_id userId,m.createAt createTime,m.updateAt updateTime,
    (SELECT COUNT(*)FROM moment_label ml WHERE ml.moment_id=m.id) LabelCount,
    (SELECT COUNT(*)FROM comment c WHERE c.moment_id=m.id)CommentLabel
    FROM moment m
      LEFT JOIN moment_label ml ON m.id=ml.moment_id
    WHERE m.user_id=? AND ml.label_id=?`
    const result= await connection.execute(statement,[userId,labelId])

    return result[0]
  }
  
}
module.exports=new LaberService()