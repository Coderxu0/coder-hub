const connection = require('../app/database')
class MomentService {
  async createMoment(id, content) {
    const statement = `INSERT INTO moment (content,user_id)VALUES(?,?)`
    const [result] = await connection.execute(statement, [content, id])
    return result
  }
  async getMomentById(momentId) {
    // const statement = `SELECT m.id id ,m.content content,m.createAt createTime,m.updateAt updateTime,
    // JSON_OBJECT('id',u.id,'name',u.name)users
    // FROM moment m 
    // LEFT JOIN users u  ON m.user_id=u.id
    // WHERE m.id=?`
    const statement = `SELECT m.id id ,m.content content,m.createAt createTime,m.updateAt updateTime,
    JSON_OBJECT('id',u.id,'name',u.name,'avatar_url',u.avatar_url)author,
     (SELECT IF(COUNT(c.id),JSON_ARRAYAGG(
     JSON_OBJECT('id',c.id,'content',c.content,'commentId',c.comment_id,'createTime',c.createAt,'user',
       JSON_OBJECT('id',cu.id,'name',cu.name,'avatar_url',cu.avatar_url))
      ),NULL)   FROM COMMENT c LEFT JOIN users cu ON c.user_id=cu.id WHERE c.moment_id=m.id)comments,
     IF(COUNT(l.id), JSON_ARRAYAGG(JSON_OBJECT('id',l.id,'name',l.name)),NULL) labels,
    (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/',file.filename))FROM FILE WHERE m.id=file.moment_id)urls
    FROM moment m 
    LEFT JOIN users u  ON m.user_id=u.id
    LEFT JOIN moment_label ml ON m.id=ml.moment_id
    LEFT JOIN label l ON ml.label_id=l.id
    WHERE m.id=?
    GROUP BY m.id`
    const result = await connection.execute(statement, [momentId])
    console.log(2)
    return result[0]
  }
  async getMomentList(offset, size) {
    const statement = ` SELECT m.id id ,m.content content,m.createAt createTime,m.updateAt updateTime,
    JSON_OBJECT('id',u.id,'name',u.name)users,
    (SELECT COUNT(*)FROM COMMENT c WHERE c.moment_id=m.id ) CommentCount,
    (SELECT COUNT(*)FROM moment_label m_l WHERE m_l.moment_id=m.id) LabelCount
    FROM moment m 
    LEFT JOIN users u  ON m.user_id=u.id
    LIMIT ?,?`
    const result = await connection.execute(statement, [offset, size])
    return result[0]
  }
  async updateMoment(content, momentId) {
    const statement = `UPDATE moment SET content=? WHERE id=?`
    const result = await connection.execute(statement, [content, momentId])
    return result
  }
  async deleteMoment(momentId) {
    const statement = `DELETE FROM moment WHERE id=? `
    const result = await connection.execute(statement, [momentId])
    return result
  }
  async hasLabel(momentId, labelId) {
    const statement = `SELECT *FROM moment_label WHERE moment_id=? AND label_id=?`
    const [result] = await connection.execute(statement, [momentId, labelId])
    return result[0]
  }
  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id,label_id)VALUES(?,?)`
    const result = await connection.execute(statement, [momentId, labelId])
    return result[0]
  }

}
module.exports = new MomentService()