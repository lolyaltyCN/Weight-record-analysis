/*
 * @Author: Sinwer 
 * @Date: 2018-09-15 09:29:07 
 * @content:    展示数据controller
 */ 
const recordModel = require('../service/recordService');
const stsCode = require('../utils/statusCode');

class showRecordInfo {
    /**
     * 添加用户体重记录
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async showRecordInfo(ctx) {
        let data = ctx.request.body;

        if (data) {
            let odata = await recordModel.addRecordInfo(data);
            ctx.response.status = 200;
            ctx.body = odata ? stsCode.SUCCESS_200('创建用户成功', 'odata') : stsCode.ERROR_404('添加失败！')
        } else {
            ctx.response.status = 412;
            ctx.body = '获取失败';
        }
    }
}

module.exports = showRecordInfo