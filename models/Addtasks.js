module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "addtasks", {
            Status: {
                type: Sequelize.DataTypes.BOOLEAN,
            } 
        },{
            timestamps: true,
            underscored: true
        }
    );
};