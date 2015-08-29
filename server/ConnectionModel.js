var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.MYSQL || 'mysql://root@localhost:3306/dnc');

var Connections = sequelize.define('Connections', {
  IP: Sequelize.STRING,
  Port: Sequelize.INTEGER,
  File: Sequelize.STRING
});

var Users = sequelize.define('Users', {
  name: Sequelize.STRING
});

Users.hasMany(Connections, {as: 'UserId'});

sequelize.sync();

/*
* Fix constraints and edge cases for db funcs
*/

module.exports = {
  addUser: function(req, res) {
    Users.build({
      name: req.body.name
    })
    .save()
    .then(function(user) {
      res.send(user);
    }).catch(function(error){
      console.log("Error in adding user to database: ", error);
    });
  },
  addConnection: function(req, res) {
    //Insert connection into db
    Connections.build({
      UserId: req.body.UserId,
      IP: req.ip,
      Port: req.body.Port,
      File: req.body.File
    })
    .save()
    .then(function(connection){
      //Send a 200
      res.sendStatus(200);
    }).catch(function(error){
      console.log("Error in adding connection to database: ", error);
    });
  },
  getConnections: function(req, res){
    //Find all connections where userID is user
    Connections.findAll({
      where: { UserId: req.body.UserId }
    }).then(function(results) {
      //Send the results back
      res.send(results);
    }).catch(function(error){
      console.log("Error in retrieving connection to database: ", error);
    });
  }
};

//Need error handling