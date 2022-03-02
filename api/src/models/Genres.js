const { DataTypes } = require('sequelize');

module.exports = (Sequelize) => {
    Sequelize.define('genre', { 
        // id:{
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //   },
          name: {
            type: DataTypes.STRING, 
            allowNull: false,
            primaryKey: true,
          }
    })
}