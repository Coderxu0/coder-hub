const labelService = require('../service/label.service')
const LabelService=require('../service/label.service')
class LabelCotroller{
  async getLabelList(ctx,next){
    try {
      const {id}=ctx.user
      const {offset,size}=ctx.query
      const result=await LabelService.getLabelList(id,offset,size)
      ctx.body=result
    } catch (err) {
      const error=new Error(errorType.QUERY_OR_PARAMS_IS_INCORRENT)
      ctx.app.emit('error',error,ctx)
    }
  }
  async getMomentByLabels(ctx,next){
    try {
      const {id}=ctx.user
      const {labelId}=ctx.params
      const result=await labelService.getMomentByLabel(id,labelId)
      ctx.body=result
    } catch (err) {
      const error = new Error(errorType.QUERY_OR_PARAMS_IS_INCORRENT)
      ctx.app.emit('error', error, ctx)
    }
  }
}
module.exports=new LabelCotroller()