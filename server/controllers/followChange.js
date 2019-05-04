const {
    mysql
} = require('../qcloud')

/**
 * 响应 GET 请求（响应微信配置时的签名检查请求）
 */
module.exports = async (ctx) => {
    let {
        follow,
        openId,
        following
    } = ctx.request.body
    let params = {
        openId,
        following
    }
    // console.log(typeof like)
    console.log(openId)
    console.log(following)
    if (follow=="true") {
        try {
            await mysql('followlist').insert(params)
            await mysql('msglist').insert({openId,type:'follow'})
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
        await mysql('followlist').where(params).del()
        try {
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