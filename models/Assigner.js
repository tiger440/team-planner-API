module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "assigner", {
            Status: {
                type: Sequelize.DataTypes.BOOLEAN,
            } 
        },{
            timestamps: true,
            underscored: true
        }
    );
};