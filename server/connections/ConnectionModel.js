var Sequelize = require('sequelize');

module.exports = function (sequelize) {
  var Connections = sequelize.define('Connections', {
    IP: Sequelize.STRING,
    Port: Sequelize.INTEGER,
    File: Sequelize.STRING
  });

  return {
    Connections: Connections
  }; // End of return
};