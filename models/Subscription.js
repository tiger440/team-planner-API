module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "subscription", {
            id: {
                type:  Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            type: {
                type: Sequelize.DataTypes.STRING(45),
                allowNull: false
            },
            prix: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false
            },
        },{
            timestamps: true,
            underscored: true
        }
    )
}