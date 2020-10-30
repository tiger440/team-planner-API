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
                type: Sequelize.DataTypes.STRING(150),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.DataTypes.STRING,
                allowNUll: false
            },
            poste: {
                type: Sequelize.DataTypes.STRING(45),
                allowNUll: true
            },
            image: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: true
            },
            Status: {
                type: Sequelize.DataTypes.BOOLEAN,
            }
        }, {
            timestamps: true,
            underscored: true
        }
    );
};