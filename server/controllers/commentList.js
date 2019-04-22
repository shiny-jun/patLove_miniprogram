const {
    mysql
} = require('../qcloud')

/**
 * 响应 GET 请求（响应微信配置时的签名检查请求）
 */
module.exports = async(ctx) => {
    let {
        articalId,
    } = ctx.request.query
    const detail = await mysql('commentlist').whereIn('articalId', articalId)
    for (let i = 0; i < detail.length; i++) {
        let userObj = await mysql('cSessionInfo').select('user_info').where('articalId', detail[i].openId)
        let user = JSON.parse(userObj[i].user_info)
        let userInfo = {
            nickName: user.nickName,
            avatar: user.avatarUrl
        }
        detail[i].userInfo = userInfo
    }
    console.log(detail)
    ctx.state.data = {
        list: articalList
    }
}