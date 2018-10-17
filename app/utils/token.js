const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify)

let TOKEN = {
    sign: 'secret',
    // 签发token
    issue(user) {
        const userToken = {
            username: user.user_name,
            id: user.id
        }
        // 储存token失效有效期1小时
        return jwt.sign(userToken, this.sign, {
            expiresIn: '1m'
            // expiresIn: '1h'
        });

    },
    async getToken(cookieStr) {
        return new Promise((resolve, reject) => {
             jwt.verify(cookieStr, this.sign, function (err, decoded) {
                if (err) {
                    try{
                        reject(false)
                    }catch(e){
                        reject(false)
                    }
                    
                } else {
                    resolve(decoded);
                }
            });
        })
    }
};

module.exports = TOKEN;