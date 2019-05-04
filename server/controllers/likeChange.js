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
            let author = await mysql('articallist').select('openId').where({articalId}).first()
            await mysql('msglist').insert({openId:author.openId,type:'like',likeId:id})
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
        let id =  await mysql('likelist').select('likeId').where(params).first()
        await mysql('likelist').where(params).del()
        let author = await mysql('articallist').select('openId').where({articalId}).first()
        await mysql('msglist').where({openId:author.openId,type:'like',likeId:id.likeId}).del()
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