const {
    mysql
} = require('../qcloud')

/**
 * 响应 GET 请求（响应微信配置时的签名检查请求）
 */
module.exports = async (ctx) => {
    let {
        formStr
    } = ctx.request.body
    if (formStr) {
        let form = JSON.parse(formStr)
        form.articalId = Number(form.articalId)
        try {
            let id = await mysql('commentlist').insert(form).returning('commentId')
            let author = await mysql('articallist').select('openId').where({articalId:form.articalId}).first()
            await mysql('msglist').insert({openId:author.openId,type:'comment',CommentId:id})
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