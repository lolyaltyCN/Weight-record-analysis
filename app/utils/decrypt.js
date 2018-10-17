/*
 * @Author: Sinwer 
 * @Date: 2018-09-18 20:31:31 
 * @content:    加密解密
 */
const bcrypt = require("bcrypt");

class secret {
    constructor() {
        //生成salt的迭代次数
        this.saltRounds = 10;
    } 
    /**
     * 加密 
     * @param {*} str
     * @returns
     * @memberof secret
     */
    encryption (str){
         //随机生成salt
        const salt = bcrypt.genSaltSync(this.saltRounds);
        //获取hash值
        return bcrypt.hashSync(str, salt);
    }
    /**
     * 解密
     * @param {*} str
     * @param {*} OriStr
     * @returns
     * @memberof secret
     */
    decrypt (str,OriStr){
        //str  前台传来的密码
        //OriStr 数据库存储的密码 
        return bcrypt.compareSync(str, OriStr);
    }
}
module.exports = new secret();

