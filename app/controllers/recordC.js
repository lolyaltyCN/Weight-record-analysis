/*
 * @Author: Sinwer 
 * @Date: 2018-08-20 10:03:35 
 * @content:    
 */

const recordModel = require('../service/recordService');
const stsCode = require('../utils/statusCode');
const Token = require('../utils/token');

class RecordController {
    /**
     * 添加用户体重记录
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async addUserRecordInfo(ctx) {
        let data = ctx.request.body;
        // 判断token是否失效
        let payload = await Token.getToken(ctx.header.authorization).then((payload) => {
            return payload
        }).catch((err) => {
            return err
        });

        if (data && payload) {
            data.uid = payload.id;
            let odata = await recordModel.addRecordInfo(data);
            ctx.body = odata ? stsCode.S_900(odata) : stsCode.S_903('添加失败！')
        } else {
            ctx.body = stsCode.S_909()
        }
    }

    /**
     * @static 根据月份查询用户体重信息
     * @param {*} ctx
     * @memberof RecordController
     */
    static async selectMonthRecordInfo(ctx) {
        let data = {
            mon: ctx.params.mon
        };

        let payload = await Token.getToken(ctx.header.authorization).then((payload) => {
            return payload
        }).catch((err) => {
            return err
        });

        if (data.mon && payload.id) {
            data.id = payload.id
            let odata = await recordModel.selectMonthRecordInfo(data);
            ctx.response.status = 200;
            ctx.body = odata === false ? stsCode.S_902('获取失败！') : stsCode.S_900(odata)
        } else {
            ctx.body = stsCode.S_909()
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
        return await ctx.render('./comp/addRecord.art', {
            data
        })
    }
}

module.exports = RecordController