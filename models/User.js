module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "user", {
            id: {
                type:  Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nom: {
                type: Sequelize.DataTypes.STRING(45),
                allowNull: false
            },
            prenom: {
                type: Sequelize.DataTypes.STRING(45),
                allowNull: false
            },
            email: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: false
            },
            password: {
                type: Sequelize.DataTypes.STRING(45),
            },
            image: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: true
            },
        }, {
            timestamps: true,
            underscored: true
        }
    );
};