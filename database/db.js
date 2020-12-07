const Sequelize = require('sequelize');

const dotenv = require("dotenv");
dotenv.config();

const db = {};

const dbinfo = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: "mysql",
        port: 3306,
        pool: {
            max: 5,
            min: 0
        }
    });

dbinfo.authenticate()
    .then(() => {
        console.log("Connection has been established successfully");
    })
    .catch(err => {
        console.log('unable to connect to the database:' + err)
    });

db.user = require("../models/User")(dbinfo, Sequelize);
db.admin = require("../models/Admin")(dbinfo, Sequelize);
db.task = require("../models/Task")(dbinfo, Sequelize);
db.team = require("../models/Team")(dbinfo, Sequelize);
db.subscription = require("../models/Subscription")(dbinfo, Sequelize);
db.linktask = require("../models/Linktask")(dbinfo, Sequelize);
db.linkteam = require("../models/Linkteam")(dbinfo, Sequelize);
db.souscrire = require("../models/Souscrire")(dbinfo, Sequelize);

db.user.belongsToMany(db.task, { through: 'linktask', foreignKey: 'userId' });
db.task.belongsToMany(db.user, { through: 'linktask', foreignKey: 'TaskId' });

db.user.belongsToMany(db.team, { through: 'linkteam', foreignKey: 'userId' });
db.team.belongsToMany(db.user, { through: 'linkteam', foreignKey: 'teamId' });

db.user.belongsToMany(db.subscription, { through: 'souscrire', foreignKey: 'userId' });
db.subscription.belongsToMany(db.user, { through: 'souscrire', foreignKey: 'subscriptionId' });

db.dbinfo = dbinfo;
db.Sequelize = Sequelize;

//dbinfo.sync({ force: true });

//dbinfo.sync();

module.exports = db;