const router = require('koa-router')();
const RecordController = require('../../app/controllers/recordC');

router.get('/',RecordController.addrecord);

module.exports = router;