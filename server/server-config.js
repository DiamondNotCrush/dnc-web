var express = require('express');
var bodyParser = require('body-parser');

var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.MYSQL || 'mysql://root@localhost:3306/dnc', {logging: false});

// //Call models to set associations
var Users = require("./users/UserModel")(sequelize);
var Connections = require("./connections/ConnectionModel")(sequelize);

// //Setup database tables
Users.User.hasMany(Connections.Connections, {as: 'UserId'});
sequelize.sync({force:true});

var app = express();

app.set('view engine', 'html');
app.use('/', express.static('./public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Pass app and express to middleware routing
require('./config/middleware.js')(app, express, sequelize, Users, Connections);

module.exports = app;