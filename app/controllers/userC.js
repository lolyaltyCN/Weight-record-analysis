const userModel = require('../service/userService');
const stsCode = require('../utils/statusCode');


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
            ctx.body = data
        } else {
            ctx.response.status = 412;
            ctx.body = '获取失败';
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
            let odata = await userModel.create(data);
            ctx.response.status = 200;
            ctx.body = odata ? stsCode.SUCCESS_200('创建用户成功', 'odata') : stsCode.ERROR_404('添加失败！')
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
        let user = await userModel.login(data.user_name);
        if (user) {
            if (user.password == data.password) {
                // ctx.response.status = 200;
                ctx.body = stsCode.SUCCESS_200('登录成功', {
                    id: user.id,
                    username: user.user_name,
                })
            } else {
                // ctx.response.status = 412;
                ctx.body = stsCode.ERROR_412('用户名或密码错误');
            }

        } else {
            // ctx.response.status = 401;
            ctx.body = stsCode.ERROR_403('用户不存在');
        }

    }
    /**
     * 用户注册控制器
     * @static
     * @param {*} ctx
     * @memberof UserController
     */
    static async UserRegister(ctx) {
        let data = ctx.request.body;
        let user = await userModel.login(data.user_name);
        if (user) { //判断用户是否存在
            // ctx.response.status = 401;
            ctx.body = stsCode.ERROR_403('用户存在!');
        } else {
            let userData = await userModel.register(data);
            if (userData.flag) {
                userData = userData.data
                ctx.body = stsCode.SUCCESS_200('注册成功', {
                    id: userData.id,
                    username: userData.user_name,
                })
            } else {
                ctx.body = stsCode.ERROR_403('用户存在!');
            }
        }
    }

}

module.exports = UserController;