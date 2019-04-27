const https = require('https')
const {
    mysql
} = require('../qcloud')

module.exports = async (ctx) => {
    let {
        openId,
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
    if (search) {
        count = await getCount('nickname', '%' + search + '%')
        detail = await mysql('userInfo').select().where('nickname', 'like', '%' + search + '%').limit(pageSize).offset(pageNo * pageSize)
    }
    ctx.state.data = {
        list: detail,
        count
    }
}

async function getCount(type, value) {
    let res, count
    count = await mysql('userInfo').select().count().where(type, 'like', value)
    res = count[0]['count(*)']
    return res
}