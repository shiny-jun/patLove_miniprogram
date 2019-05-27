const { mysql } = require('../qcloud')

/**
 * 响应 GET 请求（响应微信配置时的签名检查请求）
 */
module.exports = async(ctx) => {
    let {
        openId,
        signature
    } = ctx.request.body
    try {
        await mysql('userInfo').where('openId', openId).update('signature', signature)
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
}