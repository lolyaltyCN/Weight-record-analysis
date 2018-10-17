const userModel = require('../service/userService');
const stsCode = require('../utils/statusCode');
const Snowflake = require('../utils/snowflake');
const crypt = require('../utils/decrypt');
const Token = require('../utils/token');

class UserController {
    /**
     * 获取用户列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getUserInfo(ctx) {
        let userList = ctx.request.body;

        if (userList) {
            const data = await userModel.findAll();
            ctx.response.status = 200;
            ctx.body = stsCode.S_900(data)
        } else {
            ctx.response.status = 412;
            ctx.body = stsCode.S_903('获取失败');
        }
    }

    /**
     * 添加用户基本信息
     * @static
     * @param {*} ctx
     * @memberof UserController
     */
    static async addUserInfo(ctx) {
        let data = ctx.request.body;
        if (data) {
            let id = Snowflake.GetOneId();
            let odata = await userModel.create(data,id);
            ctx.response.status = 200;
            ctx.body = odata ? stsCode.S_900(odata) : stsCode.S_903('添加失败！')
        } else {
            ctx.response.status = 412;
            ctx.body = '获取失败';
        }
    }
    /**
     * 用户登录验证
     * @static
     * @param {*} ctx
     * @memberof UserController
     */
    static async UserLogin(ctx) {
        let data = ctx.request.body;
        let user = await userModel.UserExist(data.user_name);

        //查询用户是否存在
        if (user) { 
            //密码是否相同
            if (crypt.decrypt(data.password,user.password)) { 

                 // 签发token
                let TOKEN = Token.issue(user)

                ctx.body = stsCode.S_900(TOKEN)
            } else {
                ctx.body = stsCode.S_903('用户名或密码错误');
            }

        } else {
            ctx.body = stsCode.S_902('用户不存在');
        }

    }
    /**
     * 用户注册
     * @static
     * @param {*} ctx
     * @memberof UserController
     */
    static async UserRegister(ctx) {
        let data = ctx.request.body;
        let user = await userModel.UserExist(data.user_name);
        if (user) { //判断用户是否存在
            ctx.body = stsCode.S_901('用户存在!');
        } else {
            let id = Snowflake.GetOneId();
            //密码加密
            data.password = crypt.encryption(data.password);
            //创建
            let userData = await userModel.register(data,id);
            //添加成功
            ctx.body = userData.flag ? stsCode.S_900('注册成功') : stsCode.S_902('用户添加失败!');
        }
    }

}

module.exports = UserController;