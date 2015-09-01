var express = require('express');
var Sequelize = require('sequelize');

var sequelize = new Sequelize(process.env.MYSQL || 'mysql://root@localhost:3306/dnc');
// //Call models to set associations
// var Users = require("./users/UserModel")(sequelize);
// var Connections = require("./connections/ConnectionModel")(sequelize);

// //Setup database tables
// Users.User.hasMany(Connections.Connections, {as: 'UserId'});
// sequelize.sync();

var app = express();
  app.use(express.static('public'));

//Pass app and express to middleware routing
//require('./config/middleware.js')(app, express, Users, Connections);

module.exports = app;