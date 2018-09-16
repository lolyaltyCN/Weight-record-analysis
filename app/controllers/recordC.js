/*
 * @Author: Sinwer 
 * @Date: 2018-08-20 10:03:35 
 * @content:    
 */

const recordModel = require('../service/recordService');
const stsCode = require('../utils/statusCode');

class RecordController {
    /**
     * 添加用户体重记录
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async addUserRecordInfo(ctx) {
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

    /**
     * @static 根据月份查询用户体重信息
     * @param {*} ctx
     * @memberof RecordController
     */
    static async selectMonthRecordInfo(ctx) {
        let data = {
            id: ctx.params.uid,
            mon:ctx.params.mon
        };

        if (!isNaN(ctx.params.uid)) {
            let odata = await recordModel.selectMonthRecordInfo(data);
            ctx.response.status = 200;
            ctx.body = odata === false ? stsCode.ERROR_404('暂无数据！') : stsCode.SUCCESS_200('success', odata) 
        } else {
            ctx.response.status = 412;
            ctx.body = '获取失败';
        }
    }
    /**
     * 根据当前日期查询当天体重记录
     * @static
     * @param {*} ctx
     * @memberof RecordController
     */
    static async addrecord(ctx) {
        let today = new Date();
        let data = await recordModel.selectTodayRecordInfo(today);
        data = data ? data.dataValues : {};
        return await ctx.render('./comp/addRecord.art',{data})
    }
}

module.exports = RecordController