module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "task", {
            id: {
                type:  Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            task_name: {
                type: Sequelize.DataTypes.STRING(45),
                allowNull: false
            },
            start: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false
            },
            end: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false
            },
            description: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true
            },
            lieu: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: true
            },
        }, {
            timestamps: true,
            underscored: true
        }
    );
};