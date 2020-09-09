module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "role", {
            id: {
                type:  Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            role: {
                type: Sequelize.DataTypes.STRING(45),
                allowNull: false
            },
        },{
            timestamps: true,
            underscored: true
        }
    )
}