const https = require('https')
const {
    mysql
} = require('../qcloud')

module.exports = async (ctx) => {
    let {
        myId,
        type,
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
    if (openId) {
        detail = await mysql('userInfo').select().where('openId', openId)
    }
    if(type){
        let userArr=[],user=[],key=''
        if(type=='following'){
            key = 'openId'
            otherkey = 'following'
        } else if(type=="fans"){
            key="following"
            otherkey = 'openId'
        }
        console.log(type)
        user = await mysql('followlist').select().where(key, myId)
        console.log(user)
        for(let j=0;j<user.length;j++){
            userArr.push(user[j][otherkey])
        }
        detail = await mysql('userInfo').select().whereIn('openId', userArr).limit(pageSize).offset(pageNo * pageSize)
    }
    for (let i = 0; i < detail.length; i++) {
        let follow = false
        let params = {
            following: detail[i].openId,
            openId: myId
        }
        let followRes = await simpleGetCount('followlist', params)
        follow = followRes >= 1 ? true : false
        detail[i].follow = follow
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

async function simpleGetCount(table, params) {
    let res, count
    // let first = params[0]
    let sql = mysql(table).select().count().where(params)
    // if (params.length > 1) {
    //     for (i = 1; i < params.length; i++) {
    //         sql = sql.orWhere(params[i].type, params[i].value)
    //     }
    // }
    count = await sql
    console.log(count)
    res = count[0]['count(*)']
    return res
}