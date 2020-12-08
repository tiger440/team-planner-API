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
<<<<<<< HEAD
                type: Sequelize.DataTypes.STRING(150),
=======
                type: Sequelize.DataTypes.STRING(255),
>>>>>>> master
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.DataTypes.STRING,
<<<<<<< HEAD
                allowNUll: false
            },
            role: {
                type: Sequelize.DataTypes.STRING(45),
                allowNUll: true
            }
        }, {
            timestamps: true,
=======
                allowNull: false
            },
            role: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true
            },
        }, {
            timestamps: false,
>>>>>>> master
            underscored: true
        }
    );
};