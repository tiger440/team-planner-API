module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "linktask", {
            Status: {
                type: Sequelize.DataTypes.BOOLEAN,
            } 
        },{
            timestamps: true,
            underscored: true
        }
    );
};