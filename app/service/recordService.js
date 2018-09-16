/*
 * @Author: Sinwer 
 * @Date: 2018-08-20 11:02:08 
 * @content:    记录服务
 */
const db = require('../../sql/index');
const Sequelize = db.Sequelize;
const UserRecord = db.UserRecord;
const moment = require('moment');
const Snowflake = require('../utils/snowflake');

class recordModel {
    /**
     * 根据月份查询用户体重信息
     * @static
     * @param {*} user
     * @memberof recordModel
     */
    static async selectMonthRecordInfo(data) {
        let BeginData = moment(data.mon,'YYYY MM').format('YYYY-MM-DD');
        let LastData = moment(data.mon,'YYYY MM').add(1, 'months').format('YYYY-MM-DD');
        return UserRecord.findAll({
            attributes: ['begin','end','create_time'],
            where:{
                create_time: {
                    $gte: BeginData,
                    $lt: LastData
                },
                uid: data.id
            }
        }).then((res)=>{
            return res
        }).catch((res)=>{
            return false
        })
    }
    /**
     * 添加用户体重记录信息
     * @param user
     * @returns {Promise.<void>}
     */
    static async addRecordInfo(user) {
        let {
            uid,
            begin,
            end
        } = user;
        let id = Snowflake.GetOneId();
        let date = moment(new Date()).format('YYYY-MM-DD');
        let BeginData = date + ' 00:00:00';
        let LastData = date + ' 23:59:59';
        return db.transaction(function (t) {
            return UserRecord.find({ //首先 查询记录是否存在
                where: {
                    create_time: {
                        $gte: BeginData,
                        $lte: LastData
                    },
                    uid: uid
                }
            }, {
                transaction: t
            }).then((result) => {
                if (result) { // 有这项记录则修改
                    console.log('记录已经存在进行添加修改')
                    return UserRecord.update({
                        begin,
                        end,
                        update_time: new Date(),
                    }, {
                        where: {
                            id: result.id
                        }
                    }, {
                        transaction: t
                    }).then((result) => {
                        console.log('记录修改OK>>>>>')
                        console.log(result)
                        return true
                    }).catch((result) => {
                        console.log('记录修改ERR>>>>>')
                        console.log(result)
                        return false
                    })
                } else { // 否则 创建
                    console.log('记录不存在，创建一个新的')
                    return UserRecord.create({
                        id,
                        uid,
                        begin,
                        end,
                        create_time: new Date(),
                        update_time: new Date(),
                    }, {
                        transaction: t
                    }).then((res) => {
                        console.log('创建记录ok>>>>>')
                        console.log(res)
                        return true
                    }).catch((res) => {
                        console.log('创建记录ERR>>>>>')
                        console.log(res)
                        return false
                    })
                }
            })
        }).then(function (res) {
            // Committed
            console.log('最终结果')
            console.log(res)
            return res
        }).catch(function (err) {
            console.error('最终ERROR');
            console.log(res)
            return false
        });
    }
    
    /**
     * 根据当前日期查询当天体重记录
     * @static
     * @param {*} today
     * @memberof recordModel
     */
    static async selectTodayRecordInfo(today) {
        today = moment(today,'YYYY MM DD').format('YYYY-MM-DD');
        let BeginData = moment(today,'YYYY MM DD').format('YYYY-MM-DD')+' 00:00:00';
        let LastData = moment(today,'YYYY MM DD').add(1, 'day').format('YYYY-MM-DD')+' 00:00:00';
        return UserRecord.findOne({
            where:{
                create_time: {
                    $gte: BeginData,
                    $lt: LastData
                }
            }
        }).then(function (res) {
            // Committed
            console.log('最终结果')
            console.log(res)
            return res
        }).catch(function (err) {
            console.error('最终ERROR');
            console.log(err)
            return false
        });
    }
}

module.exports = recordModel