/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)
// 本次项目新增接口
//get:swiperlist获取swiper的列表
router.get('/swiperlist', controllers.swiperlist)
//get:qiniu七牛
router.get('/qiniu', controllers.qiniu)
// get:animallist获取动物品种
router.get('/animallist', controllers.animallist)
// get:patlist获取动物详细品种
router.get('/patlist', controllers.patlist)
// get:patDetail获取详情
router.get('/patDetail', controllers.patDetail)
// get:articalList获取文章列表
router.get('/articalList', controllers.articalList)
// get:myPatList查看我的宠物
router.get('/myPatList', controllers.myPatList)
// post:createPat新增宠物/修改宠物资料
router.post('/createPat', controllers.createPat)
// post:addArtical新增文章
router.post('/addArtical', controllers.addArtical)
module.exports = router
