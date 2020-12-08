module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "admin", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nom: {
                type: Sequelize.DataTypes.STRING(45),
                allowNull: true
            },
            prenom: {
                type: Sequelize.DataTypes.STRING(45),
                allowNull: true
            },
            email: {
                type: Sequelize.DataTypes.STRING(150),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.DataTypes.STRING,
                allowNUll: false
            },
            role: {
                type: Sequelize.DataTypes.STRING(45),
                allowNUll: true
            }
        }, {
            timestamps: true,
            underscored: true
        }
    );
};