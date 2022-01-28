const Router=require('koa-router')
const LabelRouter=new Router({prefix:'/label'})
const {
  verifyAuth,
}=require('../middleware/auth.middleware')
const{
  getLabelList,
  getMomentByLabels
}=require('../controller/label.controller')
//用户查询自己的查询标签列表
LabelRouter.get('/',verifyAuth,getLabelList)
//用户根据标签查询自己的动态
LabelRouter.get('/:labelId',verifyAuth,getMomentByLabels)
module.exports=LabelRouter