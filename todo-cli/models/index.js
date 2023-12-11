'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const baseFileName = path.basename(__filename);
const environment = process.env.NODE_ENV || 'development';
const configuration = require(__dirname + '/../config/config.json')[environment];
const database = {};

let databaseConnection;
if (configuration.use_env_variable) {
  databaseConnection = new Sequelize(process.env[configuration.use_env_variable], configuration);
} else {
  databaseConnection = new Sequelize(configuration.database, configuration.username, configuration.password, configuration);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== baseFileName) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(databaseConnection, Sequelize.DataTypes);
    database[model.name] = model;
  });

Object.keys(database).forEach(modelName => {
  if (database[modelName].associate) {
    database[modelName].associate(database);
  }
});

database.sequelize = databaseConnection;
database.Sequelize = Sequelize;

module.exports = database;
