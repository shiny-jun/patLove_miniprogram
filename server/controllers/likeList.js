const { mysql } = require('../qcloud')

/**
 * 响应 GET 请求（响应微信配置时的签名检查请求）
 */
module.exports = async(ctx) => {
    let {
        openId,
    } = ctx.request.query
    const detail = await mysql('likelist').select('articalId').where('openId', openId)
    let articalIds = []
    for (let i = 0; i < detail.length; i++) {
        articalIds.push(detail[i].articalId)
    }
    const articalList = await mysql('articallist').whereIn('articalId', articalIds)
    if (articalList.length) {
        for (i = 0; i < articalList.length; i++) {
            let imgs = await mysql('imglist').select('imgSrc').where('articalId', articalList[i].articalId)
            articalList[i].images = imgs
            let likeCount = await mysql('likelist').where('articalId', articalList[i].articalId).count()
            articalList[i].likeCount = likeCount[0]['count(*)']
        }
    }
    console.log(detail)
    ctx.state.data = {
        list: articalList
    }
}