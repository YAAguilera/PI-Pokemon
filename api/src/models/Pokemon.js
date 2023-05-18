const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    pokemonId: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      allowNull: false,
      unique:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING,
      allowNull:true,
    },
    hp:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    attack:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    defense:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    speed:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    height:{
      type:DataTypes.INTEGER,
      allowNull:true,
    },
    weight:{
      type:DataTypes.INTEGER,
      allowNull:true,
    },
    types:{
      type:DataTypes.STRING,
      allowNull:true
    }
  });
};



