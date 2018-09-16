const router = require('koa-router')();
const loaginController = require('../../app/controllers/loginC');

router.get('/', async (ctx, next) => {
    await ctx.render('./comp/login.art')
  })
  

module.exports = router;