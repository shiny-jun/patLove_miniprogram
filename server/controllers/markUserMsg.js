const {
    mysql
} = require('../qcloud')

/**
 * 响应 GET 请求（响应微信配置时的签名检查请求）
 */
module.exports = async (ctx) => {
    let {
        userInfoStr
    } = ctx.request.body
    if (userInfoStr) {
        let form = JSON.parse(userInfoStr)
        delete form['watermark']
        let userInfo = await mysql('userInfo').select().where('openId', form.openId)
        if (userInfo.length) {
            try {
                await mysql('userInfo').update(form).where('openId', form.openId)
                ctx.state.data = {
                    data: 'ok',
                    msg: 'success'
                }
            } catch (e) {
                ctx.state = {
                    code: -1,
                    data: {
                        msg: '更新失败' + e.sqlMessage
                    }
                }
            }
        } else {
            try {
                await mysql('userInfo').insert(form)
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

// const detail = await mysql('animallist')
// ctx.state.data={
//     list:detail
// }