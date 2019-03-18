const https = require('https')
const {
    mysql
} = require('../qcloud')

module.exports = async (ctx) => {
    const {
        animalId
    } = ctx.request.query
    console.log(animalId)
    const detail = await mysql('pattype').select().where('animalId', animalId)
    ctx.state.data = {
        list: detail
    }
}