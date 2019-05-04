const {
    mysql
} = require('../qcloud')

/**
 * 响应 GET 请求（响应微信配置时的签名检查请求）
 */
module.exports = async (ctx) => {
    let {
        follow,
        openId,
        following
    } = ctx.request.body
    let params = {
        openId,
        following
    }
    // console.log(typeof like)
    if (follow=="true") {
        try {
            let id = await mysql('followlist').insert(params).returning('followId')
            await mysql('msglist').insert({openId:following,type:'follow',followId:id})
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
        let id = await mysql('followlist').select('followId').where(params).first()
        console.log(id)
        await mysql('followlist').where(params).del()
        await mysql('msglist').where({openId:following,type:'follow',followId:id.followId}).del()
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