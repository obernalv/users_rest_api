const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

// Define tu modelo aquí
const User= sequelize.define('user', {
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false
    }
    // Agrega más propiedades según sea necesario
  });

module.exports = User;
