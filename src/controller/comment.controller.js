const commentService = require('../service/comment.service')
const CommentService = require('../service/comment.service')
const errorType = require('../constans/error_types')
class CommentController {
  async createComment(ctx, next) {
    try {
      const { momentId, content } = ctx.request.body

      const { id } = ctx.user
      const result = await CommentService.createComment(content, id, momentId)
      ctx.body = result[0]
    } catch (err) {
      const error=new Error(errorType.QUERY_OR_PARAMS_IS_INCORRENT)
      ctx.app.emit('error',error,ctx)
    }
  }
  async replyComment(ctx, next) {
    try {
      const { commentId } = ctx.params
      const { content, momentId } = ctx.request.body
      const { id } = ctx.user
      const result = await CommentService.replyComment(content, id, momentId, commentId)
      ctx.body = result[0]
    } catch (err) {
      const error=new Error(errorType.QUERY_OR_PARAMS_IS_INCORRENT)
      ctx.app.emit('error',error,ctx)
    }

  }
  async updateComment(ctx, next) {
    try {
      const { content } = ctx.request.body
      const { commentId } = ctx.params
      const result = await CommentService.updateComment(content, commentId)
      ctx.body = result[0]
    } catch (err) {
      const error=new Error(errorType.QUERY_OR_PARAMS_IS_INCORRENT)
      ctx.app.emit('error',error,ctx)
    }

  }
  async deleteComment(ctx, next) {
    try {
      const { commentId } = ctx.params
      const result = await CommentService.deleteComment(commentId)
      ctx.body = result[0]
    } catch (err) {
      const error=new Error(errorType.QUERY_OR_PARAMS_IS_INCORRENT)
      ctx.app.emit('error',error,ctx)
    }

  }
  async getCommentsList(ctx, next) {
    try {
      const { momentId } = ctx.query
      const result = await commentService.getCommentsList(momentId)
      ctx.body = result
    } catch (err) {
      const error=new Error(errorType.QUERY_OR_PARAMS_IS_INCORRENT)
      ctx.app.emit('error',error,ctx)
    }

  }
}
module.exports = new CommentController()