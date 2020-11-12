module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "image", {
            id: {
                type:  Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            image: {
                type: Sequelize.DataTypes.STRING(45),
                allowNull: false
            },
        }, {
            timestamps: true,
            underscored: true
        }
    );
};