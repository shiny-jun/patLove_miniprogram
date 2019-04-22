const {
    mysql
} = require('../qcloud')

/**
 * 响应 GET 请求（响应微信配置时的签名检查请求）
 */
module.exports = async(ctx) => {
    let {
        openId,
    } = ctx.request.query
    const signature = await mysql('cSessionInfo').select('signature').where('open_id', openId)
    let articalIdList = await mysql('articallist').select('articalId').where('openId', openId)
    let articalIds = []
    for (let i = 0; i < articalIdList.length; i++) {
        articalIds.push(articalIdList[i].articalId)
    }
    const liked = await mysql('likelist').select().count().whereIn('articalId', articalIds)
    const following = await mysql('followlist').select().count().whereIn('openId', openId)
    const follower = await mysql('followlist').select().count().whereIn('following', openId)
    let likeCount = liked[0]['count(*)']
    let followingCount = following[0]['count(*)']
    let followerCount = follower[0]['count(*)']
    ctx.state.data = {
        data: {
            signature,
            likeCount,
            followerCount,
            followingCount
        }
    }
}