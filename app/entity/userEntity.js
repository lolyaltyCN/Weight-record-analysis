const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('userinfo', {
        id: {
            type: DataTypes.BIGINT(11),
            primaryKey: true
        },
        user_name: DataTypes.STRING,
        birthday: {
            type:DataTypes.DATE ,
            get: function () {
                let date = this.getDataValue('birthday');
                // return date ? moment(date).format('YYYY-MM-DD'):"1967-01-01"
                return  moment(date).format('YYYY-MM-DD')
            },
            set:function () {
                this.setDataValue('birthday',this.birthday);
            },
            defaultValue: sequelize.Sequelize.NOW
        },
        create_time: {
            type: DataTypes.DATE,
            get: function () {
                let date = this.getDataValue('create_time');
                return moment(date).format('YYYY-MM-DD HH:mm:ss')
                
            },
            set:function () {
                this.setDataValue('create_time',this.create_time);
            }
        },
        update_time: {
            type: DataTypes.DATE,
            get: function () {
                let date = this.getDataValue('update_time');
                return moment(date).format('YYYY-MM-DD HH:mm:ss')
            },
            set:function () {
                this.setDataValue('update_time',this.update_time);
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