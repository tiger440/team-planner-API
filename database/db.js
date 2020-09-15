const Sequelize = require('sequelize');

const db = {};

const dbinfo = new Sequelize("dbteamplanner", "root", "", {
    host: "localhost",
    dialect: "mysql",
    port: 3308,
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
db.task = require("../models/Task")(dbinfo, Sequelize);
db.team = require("../models/Team")(dbinfo, Sequelize);
db.role = require("../models/Role")(dbinfo, Sequelize);
db.subscription = require("../models/Subscription")(dbinfo, Sequelize);
db.addtasks = require("../models/Addtasks")(dbinfo, Sequelize);
db.assigner = require("../models/Assigner")(dbinfo, Sequelize);
db.souscrire = require("../models/Souscrire")(dbinfo, Sequelize);


db.dbinfo = dbinfo;
db.Sequelize = Sequelize;

//dbinfo.sync({force: true});

//dbinfo.sync();

module.exports = db;