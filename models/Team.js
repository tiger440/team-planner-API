module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "team", {
            id: {
                type:  Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            team_name: {
                type: Sequelize.DataTypes.STRING(45),
                allowNull: false
            },
        }, {
            timestamps: true,
            underscored: true
        }
    );
};