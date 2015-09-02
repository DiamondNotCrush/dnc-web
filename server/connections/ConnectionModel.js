var Sequelize = require('sequelize');

module.exports = function (sequelize) {
  var Connections = sequelize.define('Connections', {
    IP: Sequelize.STRING,
    Port: Sequelize.INTEGER
  });

  return {
    Connections: Connections
  }; // End of return
};