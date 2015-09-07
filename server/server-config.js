var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.MYSQL || 'mysql://root@localhost:3306/dnc', {logging: false});

// //Call models to set associations
var Users = require("./users/UserModel")(sequelize);
var Connections = require("./connections/ConnectionModel")(sequelize);

// //Setup database tables
Users.User.hasOne(Connections.Connections, {as: 'UserId', unique: true});
sequelize.sync();

//Pass app and express to middleware routing
require('./config/middleware.js')(app, express, sequelize, Users, Connections);

module.exports = app;