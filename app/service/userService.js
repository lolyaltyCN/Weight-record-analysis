const db = require('../../sql/index')
const Sequelize = db.Sequelize
const User = db.User;
const UserSecret = db.UserSecret;
const UserRecord = db.UserRecord;
const Snowflake = require('../utils/snowflake');
const bcrypt = require('bcryptjs');

class UserModel {
    /**
     * 查询用户
     * @param user
     * @returns {Promise<boolean>}
     */
    static async findAll() {
        return await User.findAll()
    }
    /**
     * 添加用户基础信息
     * @param user
     * @returns {Promise.<void>}
     */
    static async create(user) {
        let {
            birthday,
            user_name
        } = user;
        let id = Snowflake.GetOneId();
        return await User.create({
            id: id,
            birthday,
            user_name,
            create_time: new Date(),
            update_time: new Date(),
        }).then((res) => {
            console.log('@@@@@@@@@添加新用户成功' + res);
            return true
        }).catch((res) => {
            console.log('@@@@@@@@@添加新用户失败' + res);
            return false
        })
    }
    /**
     * 查询用户
     * @param name
     * @returns {Promise<boolean>}
     */
    static async login(name) {
        return await UserSecret.findOne({
            where: {
                user_name: name
            }
        })
    }
    /**
     * 用户注册
     * @static
     * @param {*} name
     * @returns
     * @memberof UserModel
     */
    static async register(user) {
        let {
            user_name,
            password
        } = user;
        let id = Snowflake.GetOneId();
        return db.transaction(function (t) {
            return  UserSecret.create({
                id: id,
                user_name,
                password,
                status: 0,
                create_time: new Date(),
                update_time: new Date(),
            }, {
                transaction: t
            }).then((res) => {
                console.log('>>>>>>>>新用户注册成功开始添加用户信息<<<<<<<<<<<<');
                return User.create({
                    id: id,
                    user_name,
                    create_time: new Date(),
                    update_time: new Date(),
                })
            }) 
        }).then((res) => {
            console.log('@@@@@@@@@添加新用户成功');
            console.log(res);
            return {
                data:res.dataValues,
                flag:true
            }
        }).catch((res) => {
            console.log('@@@@@@@@@添加新用户失败');
            console.log(res);
            return {
                flag:false
            }
        })
    }
    
}

module.exports = UserModel