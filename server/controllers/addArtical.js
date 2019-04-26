const {
    mysql
} = require('../qcloud')

/**
 * 响应 GET 请求（响应微信配置时的签名检查请求）
 */
module.exports = async (ctx) => {
    let {
        formStr
    } = ctx.request.body
    if (formStr) {
        let form = JSON.parse(formStr)
        // toNumList.forEach(item => {
        //     form[item] = Number(form[item])
        // });
        console.log(form)
        let patList = form.patList
        delete form['patList']
        let animalvalue = [],patIdArr=[]
        patList.forEach((item,index)=>{
            animalvalue.push(item.value)
        delete item['value']
        })
        form.animalvalue = JSON.stringify(animalvalue) 
        form.patIdArr = JSON.stringify(patList)
        // 处理照片数组
        let imageList = form.imageList
        delete form['imageList']
        if (formStr.articalId) {
            try {
                await mysql('articallist').where('articalId', form.articalId).update(form)
                ctx.state.data = {
                    data: 'ok',
                    msg: 'success'
                }
            } catch (e) {
                ctx.state = {
                    code: -1,
                    data: {
                        msg: '新增失败' + e.sqlMessage
                    }
                }
            }
        } else {
            try {
                let id = await mysql('articallist').insert(form).returning('articalId')
                if(id){
                    let len = imageList.length
                    for(let i = 0;i<len;i++){
                        let obj = {
                            articalId:id,
                            imgSrc:imageList[i]
                        }
                        await mysql('imglist').insert(obj)
                    }
                }
                ctx.state.data = {
                    data: 'ok',
                    msg: 'success'
                }
            } catch (e) {
                ctx.state = {
                    code: -1,
                    data: {
                        msg: '新增失败' + e.sqlMessage
                    }
                }
            }
        }
    }
}