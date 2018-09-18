const router = require('koa-router')();

router.get('/', async (ctx, next) => {
    await ctx.render('./comp/reg.art', {
      title: '欢迎访问',
      data: '首页欢迎您!'
    })
  })
  

module.exports = router;