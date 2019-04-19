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
    let toNumList = ['weight', 'sex', 'isUnbrith']
    if (formStr) {
        let form = JSON.parse(formStr)
        toNumList.forEach(item => {
            form[item] = Number(form[item])
        });
        console.log(form)
        const findRes = await mysql('books').select().where('patId', form.patId)
        if(findRes.length){
            try {
                await mysql('pat').where('patId', form.patId).update(form)
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
            await mysql('pat').insert(form)
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

    // const detail = await mysql('animallist')
    // ctx.state.data={
    //     list:detail
    // }
}