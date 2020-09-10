module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "souscrire", {
            Status: {
                type: Sequelize.DataTypes.BOOLEAN,
            } 
        },{
            timestamps: true,
            underscored: true
        }
    );
};