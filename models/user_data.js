'use strict';
module.exports = (sequelize, Sequelize) => {
  const user_data = sequelize.define("user_data", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }
  );
  return user_data;
}