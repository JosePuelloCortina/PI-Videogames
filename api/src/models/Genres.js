const { DataTypes } = require('sequelize');

module.exports = (Sequelize) => {
    Sequelize.define('genre', {
        // id:{
        //     type: DataTypes.NUMBER,
        //     primaryKey: true,
        //     allowNull: false
        //   },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          }
    })
}