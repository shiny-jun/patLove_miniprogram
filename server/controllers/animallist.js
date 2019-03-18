const { mysql } = require('../qcloud')

/**
 * 响应 GET 请求（响应微信配置时的签名检查请求）
 */
module.exports = async (ctx) => {
    const detail = await mysql('animallist')
    ctx.state.data={
        list:detail
    }
}