const { DataTypes } = require('sequelize');

module.exports = (Sequelize) => {
    Sequelize.define('genre', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
            allowNull: false
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          }
    })
}