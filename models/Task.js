module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "task", {
            Id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            Subject: {
                type: Sequelize.DataTypes.STRING(45),
                allowNull: false
            },
            StartTime: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false
            },
            EndTime: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false
            },
            StartTimezone: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true
            },
            EndTimezone: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true
            },
            Location: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: true
            },
            Description: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true
            },
            isAllDay: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: true
            },
        }, {
            timestamps: true,
            underscored: true
        }
    );
};