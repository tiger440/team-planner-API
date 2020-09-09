const Sequelize = require('sequelize');

const db = {};

const dbinfo = new Sequelize("db_teamplanner", "root", "", {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
    pool: {
        max: 5,
        min: 0
    }
});

dbinfo
    .anthenticate()
    .then(() => {
        console.log("Connection has been established successfully");
    })
    .catch(err => {
        console.log('unable to connect to the database:' + err)
    });



db.info = dbinfo;
db.Sequelize = Sequelize;

//db.info.sync({force: true});

//db.info;sync();

module.exports = db;