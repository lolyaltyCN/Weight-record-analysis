const router = require('koa-router')();
const UserController = require('../../app/controllers/userC');

/* const router = new Router({
    prefix: '/api/v1'
}) */

/**
 * 用户接口
 */
// 获取用户信息
router.get('/user', UserController.getUserInfo);
//添加用户信息
router.post('/user/add', UserController.addUserInfo);
//用户登录认证
router.post('/user/login', UserController.UserLogin);
//用户注册
router.post('/user/reg', UserController.UserRegister);

module.exports = router
