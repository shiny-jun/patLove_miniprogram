const {
    mysql
} = require('../qcloud')

/**
 * 响应 GET 请求（响应微信配置时的签名检查请求）
 */
module.exports = async (ctx) => {
    let {
        like,
        openId,
        articalId
    } = ctx.request.body
    let params = {
        openId,
        articalId
    }
    console.log(typeof like)
    console.log(openId)
    console.log(articalId)
    if (like=="true") {
        try {
            let id = await mysql('likelist').insert(params).returning('likeId')
            await mysql('msglist').insert({openId,type:'like',likeId:id})
            ctx.state.data = {
                data: 'ok',
                msg: 'success'
            }
        } catch (e) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '更新失败' + e.sqlMessage
                }
            }
        }
    } else {
        await mysql('likelist').where(params).del()
        try {
            ctx.state.data = {
                data: 'ok',
                msg: 'success'
            }
        } catch (e) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '新增失败' + e.sqlMessage
                }
            }
        }
    }
}