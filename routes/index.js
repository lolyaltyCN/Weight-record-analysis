/*
 * @Author: Sinwer 
 * @Date: 2018-09-12 14:42:44 
 * @content:    主路由文件
 */ 
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();

const reg = require('./template/reg');
const login = require('./template/login');
const addrecord = require('./template/addRecord');
const show = require('./template/show');

const userinfo = require('./api/user');
const record = require('./api/record');
/* 
** api
*/
router.use('/api',userinfo.routes(),userinfo.allowedMethods());
router.use('/api',record.routes(),record.allowedMethods());
/* 
** 模板
*/
router.use('/reg',reg.routes(),reg.allowedMethods());
router.use('/login',login.routes(),login.allowedMethods());
router.use('/addrecord',addrecord.routes(),addrecord.allowedMethods());
router.use('/show',show.routes(),show.allowedMethods());
/* 
** 首页
*/

router.get('/', async (ctx, next) => {
//   ctx.redirect('/login')
  ctx.render('index.art')
})

module.exports = router;