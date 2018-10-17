const router = require('koa-router')();
const RecordController = require('../../app/controllers/recordC');

/* const router = new Router({
    prefix: '/record/'
}) */

/**
 * 用户接口
 */
//添加体重记录
router.post('/record/add', RecordController.addUserRecordInfo);
//根据月份查询记录信息
router.get('/record/mon/:mon', RecordController.selectMonthRecordInfo);

module.exports = router
