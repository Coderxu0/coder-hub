const {
createComment,
replyComment,
updateComment,
deleteComment,
getCommentsList,
}=require('../controller/comment.controller')

const{
verifyAuth,
verifyPermission
}=require('../middleware/auth.middleware')
const Router=require('koa-router')
const CommentRouter=new Router({prefix:'/comment'})

CommentRouter.post('/',verifyAuth,createComment)
CommentRouter.post('/:commentId/reply',verifyAuth,replyComment)
CommentRouter.patch('/:commentId',verifyAuth,verifyPermission,updateComment)
CommentRouter.delete('/:commentId',verifyAuth,verifyPermission,deleteComment)
CommentRouter.get('/',verifyAuth,getCommentsList)

module.exports=CommentRouter