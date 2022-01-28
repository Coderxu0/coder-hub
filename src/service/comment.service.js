const connection=require('../app/database')
class CommentService{
  async createComment(content,id,momentId){
    const statement=`INSERT INTO comment (content,user_id,moment_id)VALUES (?,?,?) `
    const result =await connection.execute(statement,[content,id,momentId])
    return result
  }
  async replyComment(content,id,momentId,commentId){
    const statement=`INSERT INTO comment (content,user_id,moment_id,comment_id)VALUES(?,?,?,?)`
    const result=await connection.execute(statement,[content,id,momentId,commentId])
    return result
  }
  async updateComment(content,commentId){
    const statement=`UPDATE comment SET content=? WHERE id=?`
    const result=await connection.execute(statement,[content,commentId])
    return result
  }
  async deleteComment(commentId){
    const statement=`DELETE FROM comment WHERE id=?`
    const result=await connection.execute(statement,[commentId])
    return result
  }
  async getCommentsList(momentId){
    const statement=`  SELECT c.id,content,comment_id commentId,c.createAt createTime ,JSON_OBJECT('id',u.id,'name',u.name) user
    FROM COMMENT c
    LEFT JOIN users u ON c.user_id=u.id
    WHERE c.moment_id= ? `
    const result=await connection.execute(statement,[momentId])
    return result[0]
  }

}
module.exports=new CommentService()