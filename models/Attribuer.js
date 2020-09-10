module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "attribuer", {
            Status: {
                type: Sequelize.DataTypes.BOOLEAN,
            } 
        },{
            timestamps: true,
            underscored: true
        }
    );
};