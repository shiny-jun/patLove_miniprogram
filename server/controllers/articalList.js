const https = require('https')
const {
    mysql
} = require('../qcloud')

module.exports = async(ctx) => {
    let {
        value,
        openId,
        articalId,
        search,
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
    if (value) {
        if (value == 'recommend') {
            count = await getCount('value')
                // detail = await mysql('articallist').select('articallist.*','imglist.imgSrc').join('imglist', 'articallist.articalId', 'imglist.articalId').orderBy('articallist.looked', 'desc').limit(10)
            if (pageNo * pageSize >= count) {
                detail = []
            } else {
                detail = await mysql('articallist').select().orderBy('looked', 'desc').limit(pageSize).offset(pageNo * pageSize)
            }
        } else if (value == 'follow') {
            followers = await mysql('followlist').select('following').where('openId', openId)
            console.log(followers)
            count = await getCount('openId', openId, followers)
            let sql = mysql('articallist').select().limit(pageSize).offset(pageNo * pageSize).where('openId', openId)
            for (i = 0; i < followers.length; i++) {
                sql = sql.orWhere('openId', followers[i].following)
            }
            detail = await sql
        } else {
            count = await getCount('value', value)
            detail = await mysql('articallist').select().where('animalvalue','like', '%'+value+'%').limit(pageSize).offset(pageNo * pageSize)
        }
    
    } else if(search){
        count = await getCount('title', '%'+search+'%')
        detail = await mysql('articallist').select().where('title','like','%'+search+'%').limit(pageSize).offset(pageNo * pageSize)
    } else if (openId) {
        count = await getCount('openId', openId)
        detail = await mysql('articallist').select().where('openId', openId).limit(pageSize).offset(pageNo * pageSize)
    } else if (articalId) {
        detail = await mysql('articallist').select().where('articalId', articalId)
    }
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
    ctx.state.data = {
        list: detail,
        count
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
        count = await mysql('articallist').select().count().where(type,'like', value)
    }
    return res
}