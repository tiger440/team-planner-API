module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "linkteam", {
            chef: {
                type: Sequelize.DataTypes.BOOLEAN,
            }
        },{
            timestamps: true,
            underscored: true
        }
    );
};