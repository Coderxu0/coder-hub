const LabelService=require('../service/label.service')
module.exports={
  async verifyLabelExists(ctx,next){
    const {labels}=ctx.request.body
    const LabelsArr=[]
    //判断每一个标签是否存在
    for(let name of labels){
      const label={name}
      const labelResult=await LabelService.getLabelByName(name)
      //如果不存在undefined就创建一个标签
      if(!labelResult){
       const createResult=await LabelService.createLabel(name)
       label.id=createResult.insertId
      }else{
        label.id=labelResult.id
      }
      LabelsArr.push(label)
    }

    //不存在的标签创建并返回id，存在的直接拿到id  再加上name
    ctx.LabelsArr=LabelsArr
    await next()
  }
}