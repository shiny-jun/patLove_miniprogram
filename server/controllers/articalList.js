const https = require('https')
const {
    mysql
} = require('../qcloud')

module.exports = async (ctx) => {
    const {
        value,
        openId,
        articalId
    } = ctx.request.query
    let detail
    if (value) {
        if (value == 'recommend') {
            // detail = await mysql('articallist').select('articallist.*','imglist.imgSrc').join('imglist', 'articallist.articalId', 'imglist.articalId').orderBy('articallist.looked', 'desc').limit(10)
            detail = await mysql('articallist').select().orderBy('looked', 'desc').limit(10)
        } else if (value == 'follow') {
            followers = await mysql('followlist').select('following').where('openId', openId)
            console.log(followers)
            sql = mysql('articallist').select().where('openId', openId)
            for (i = 0; i < followers.length; i++) {
                sql = sql.orWhere('openId', followers[i].following)
            }
            detail = await sql
        } else {
            detail = await mysql('articallist').select().where('animalvalue', value)
        }
    } else if (openId) {
        detail = await mysql('articallist').select().where('openId', openId)
    } else if (articalId) {
        detail = await mysql('articallist').select().where('articalId', articalId)
    }
    if (detail.length) {
        for(i=0;i<detail.length;i++){
            let imgs = await mysql('imglist').select('imgSrc').where('articalId', detail[i].articalId)
            detail[i].images = imgs
        }
    }
    ctx.state.data = {
        list: detail
    }
}