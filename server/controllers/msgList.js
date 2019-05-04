const {
    mysql
} = require('../qcloud')

/**
 * 响应 GET 请求（响应微信配置时的签名检查请求）
 */
module.exports = async (ctx) => {
    let {
        openId,
        type
    } = ctx.request.query
    let params = {
        type,
        openId
    }
    let detail = await mysql('msglist').select().where(params).orderBy('commentId', 'desc')
    if (type == "follow") {
        for (let i = 0; i < detail.length; i++) {
            // articalIds.push(detail[i].articalId)
            let followMsg = await mysql('followlist').select().where('followId', detail[i].followId).first()
            if (followMsg) {
                let follower = followMsg.openId
                let user = await mysql('userInfo').select().where('openId', follower).first()
                let userInfo = {
                    nickName: user.nickName,
                    openId: user.openId,
                    avatarUrl: user.avatarUrl
                }
                detail[i].userInfo = userInfo
            } else {
                detail[i].state = 'undefine'
            }

        }
    } else if (type == 'comment') {
        for (let i = 0; i < detail.length; i++) {
            // articalIds.push(detail[i].articalId)
            let commentMsg = await mysql('commentlist').select().where('commentId', detail[i].commentId).first()
            if (commentMsg) {
                detail[i].commentMsg = commentMsg
                //查写手资料
                let commenter = commentMsg.openId
                let user = await mysql('userInfo').select().where('openId', commenter).first()
                let userInfo = {
                    nickName: user.nickName,
                    openId: user.openId,
                    avatarUrl: user.avatarUrl
                }
                detail[i].userInfo = userInfo
                //找文章图片
                let articalId = commentMsg.articalId
                let imgUrl = await mysql('imglist').select().where('articalId', articalId).first()
                detail[i].articalImg = imgUrl.imgSrc
            } else {
                detail[i].state = 'undefine'
            }

        }
    } else if (type == 'like') {
        for (let i = 0; i < detail.length; i++) {
            // articalIds.push(detail[i].articalId)
            console.log(detail[i].likeId)
            let likeMsg = await mysql('likelist').select().where('likeId', detail[i].likeId).first()
            if (likeMsg) {
                detail[i].likeMsg = likeMsg
                console.log(likeMsg)
                //查写手资料
                let likeer = likeMsg.openId
                let user = await mysql('userInfo').select().where('openId', likeer).first()
                let userInfo = {
                    nickName: user.nickName,
                    openId: user.openId,
                    avatarUrl: user.avatarUrl
                }
                detail[i].userInfo = userInfo
                //找文章图片
                let articalId = likeMsg.articalId
                let imgUrl = await mysql('imglist').select().where('articalId', articalId).first()
                detail[i].articalImg = imgUrl.imgSrc
            } else {
                detail[i].state = 'undefine'
            }
        }
    }

    console.log(detail)
    ctx.state.data = {
        list: detail
    }
}