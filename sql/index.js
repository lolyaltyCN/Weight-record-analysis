const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const db = new Sequelize('weight', 'root', 'zw1048478', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: {
        $and: Op.and,
        $or: Op.or,
        $eq: Op.eq,
        $gt: Op.gt,
        $gte: Op.gte,
        $lt: Op.lt,
        $lte: Op.lte,
        $like: Op.like
      },
    port:3306,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
        maxConnections: 20,
        maxIdleTime: 30000
    },
    timezone: '+08:00' //东八时区
});

db.UserRecord = db.import('../app/entity/recordEntity.js');
db.User = db.import('../app/entity/userEntity.js');
db.UserSecret = db.import('../app/entity/UserSecretEntity.js');

db.User.hasMany(db.UserRecord,{foreignKey:"uid"});


module.exports = db;