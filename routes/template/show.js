const router = require('koa-router')();
const ShowController = require('../../app/controllers/showC');

router.get('/', async (ctx, next) => {
    await ctx.render('./comp/show.art')
})

module.exports = router;