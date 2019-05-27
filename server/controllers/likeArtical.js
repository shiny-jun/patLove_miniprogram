const https = require('https')
const {
    mysql
} = require('../qcloud')

module.exports = async (ctx) => {
    let {
        openId,
        pageSize,
        pageNo
    } = ctx.request.query
    let detail, count = 0
    if (!pageSize) {
        pageSize = 2
    }
    if (!pageNo) {
        pageNo = 0
    }
    //获取点赞的笔记ids
    let articalId = await mysql('likelist').select().where('openId', openId).limit(pageSize).offset(pageNo * pageSize).orderBy('likeId', 'desc')
    let articalIdArr = []
    for(let i=0;i<articalId.length;i++){
        articalIdArr.push(articalId[i].articalId)
    }
    console.log(articalIdArr)
    // count = await getCount('openId', openId)
    detail = await mysql('articallist').select().whereIn('articalId', articalIdArr)
    if (detail.length) {
        for (i = 0; i < detail.length; i++) {
            let imgs = await mysql('imglist').select('imgSrc').where('articalId', detail[i].articalId)
            detail[i].images = imgs
            let userObj = await mysql('cSessionInfo').select('user_info').where('open_id', detail[i].openId)
            let user = JSON.parse(userObj[0].user_info)
            let userInfo = {
                nickName: user.nickName,
                avatar: user.avatarUrl
            }
            detail[i].userInfo = userInfo
            let likeCount = await mysql('likelist').where('articalId', detail[i].articalId).count()
            detail[i].likeCount = likeCount[0]['count(*)']
        }
    }
    let resDetail = []
    for(let j=0;j<detail.length;j++){
        let index = articalIdArr.indexOf(detail[j].articalId)
        resDetail[index] = detail[j]
    }
    ctx.state.data = {
        list: resDetail,
        // count
    }
}

async function getCount(type, value, followers) {
    let res, count
    if (type == 'openId') {
        let sql = mysql('articallist').select().count().where('openId', value)
        if (followers) {
            if (followers.length) {
                for (i = 0; i < followers.length; i++) {
                    sql = sql.orWhere('openId', followers[i].following)
                }
            }
        }
        count = await sql
        console.log(count)
        res = count[0]['count(*)']
    } else if (type == 'value') {
        if (value) {
            count = await mysql('articallist').select().count().where('animalvalue', value)
        } else {
            count = await mysql('articallist').select().count()
        }
        res = count[0]['count(*)']
    } else {
        count = await mysql('articallist').select().count().where(type, 'like', value)
        res = count[0]['count(*)']
    }
    return res
}