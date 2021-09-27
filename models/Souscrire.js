module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "souscrire", {
            status: {
                type: Sequelize.DataTypes.BOOLEAN,
            }
        }, {
            timestamps: true,
            underscored: true
        }
    );
};