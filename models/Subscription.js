module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "subscription", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            subscription_name: {
                type: Sequelize.DataTypes.STRING(45),
                unique: true,
            },
            price: {
                type: Sequelize.DataTypes.INTEGER,
            }
        }, {
            timestamps: true,
            underscored: true
        }
    );
};