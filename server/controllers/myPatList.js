const https = require('https')
const {
    mysql
} = require('../qcloud')

module.exports = async (ctx) => {
    const {
        openId,
        pageSize,
        pageNo
    } = ctx.request.query
    let detail
    if (openId) {
        detail = await mysql('pat').select('pat.*','animallist.chineseName').join('animallist', 'pat.animalName', 'animallist.animalName').where('openId', openId).limit(pageSize).offset(pageNo * pageSize)
    }
    ctx.state.data = {
        list: detail
    }
}