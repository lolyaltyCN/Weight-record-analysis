const router = require('koa-router')();

router.get('/', async (ctx, next) => {
    await ctx.render('./comp/login.art')
  })
  

module.exports = router;