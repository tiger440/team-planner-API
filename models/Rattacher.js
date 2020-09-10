module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "rattacher", {
            Status: {
                type: Sequelize.DataTypes.BOOLEAN,
            } 
        },{
            timestamps: true,
            underscored: true
        }
    );
};