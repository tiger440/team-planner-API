module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "linktask", {
            status: {
                type: Sequelize.DataTypes.BOOLEAN,
            }
        }, {
            timestamps: true,
            underscored: true
        }
    );
};