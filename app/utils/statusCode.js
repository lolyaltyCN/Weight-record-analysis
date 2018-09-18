/*
 * @Author: Sinwer 
 * @Date: 2018-09-16 12:09:33 
 * @content:    status code
 */

 class statusCode {
    /**
     * 成功  success 900
     * @param {*} data
     * @returns
     * @memberof statusCode
     */
    S_900 (data){
        return {
            code: 900,
            msg:'success',
            data
        }
    }
    /**
     * 存在  exist 901
     * @param {*} msg
     * @returns
     * @memberof statusCode
     */
    S_901 (msg){
        return {
            code: 901,
            msg
        }
    }
    /**
     * 不存在  no  exist 902
     * @param {*} msg
     * @returns
     * @memberof statusCode
     */
    S_902 (msg){
        return {
            code: 902,
            msg
        }
    }
    /**
     * 错误  error   903
     * @param {*} msg
     * @returns
     * @memberof statusCode
     */
    S_903(msg){
        return {
            code: 903,
            msg
        }
    }
}
module.exports = new statusCode();
