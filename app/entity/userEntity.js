const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('userinfo', {
        id: {
            type: DataTypes.BIGINT(11),
            autoIncrement: true,
            primaryKey: true
        },
        user_name: DataTypes.STRING,
        birthday: DataTypes.DATE,
        create_time: {
            type: DataTypes.DATE,
            get: function () {
                let date = this.getDataValue('create_time');
                return moment(date).format('YYYY-MM-DD HH:mm:ss')
            }
        },
        update_time: {
            type: DataTypes.DATE,
            get: function () {
                let date = this.getDataValue('update_time');
                return moment(date).format('YYYY-MM-DD HH:mm:ss')
            }
        }
    }, {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true,
        timestamps: false
    })
}