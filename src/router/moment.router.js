const Router=require('koa-router')
const{
  create,
  detail,
  list,
  update,
  del,
  addLabels,
  fileInfo
}=require('../controller/moment.controller.js')
const{
  verifyAuth,
  verifyPermission,

}=require('../middleware/auth.middleware')
const {
verifyLabelExists
}=require('../middleware/label.middleware')
const momentRouter=new Router({
  prefix:'/moment'
})
//用户写内容
momentRouter.post('/',verifyAuth,create)
//游客查看内容(不需要验证，params)
momentRouter.get('/:momentId',detail)
//游客查看分页内容(不需要验证，query)
momentRouter.get('/',list)
//用户自己修改动态内容 params
//1.token登录验证 2.权限验证(用户只能修改自己的动态)
momentRouter.patch('/:momentId',verifyAuth,verifyPermission,update)

//用户自己删除动态内容 params
//1.token登录验证 2.权限验证(用户只能删除自己的动态)
momentRouter.delete('/:momentId',verifyAuth,verifyPermission,del)

//为动态添加标签，可以添加多个
momentRouter.post('/:momentId/labels',verifyAuth,verifyPermission,verifyLabelExists,addLabels)

//获取动态配图接口
momentRouter.get('/images/:filename',fileInfo)
module.exports=momentRouter