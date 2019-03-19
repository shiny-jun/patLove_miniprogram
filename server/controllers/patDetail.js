const https = require('https')
const {
    mysql
} = require('../qcloud')

module.exports = async (ctx) => {
    const {
        animalId,
        typeId
    } = ctx.request.query
    let detail
    if (animalId) {
        detail = await mysql('pattype').select().where('animalId', animalId)
    } else if (typeId) {
        detail = await mysql('pattype').select().where('typeId', typeId)
    } 
    ctx.state.data = {
        list: detail
    }
}