//Connection Controller
module.exports = function (Connections) {
  var Connection = Connections.Connections;
  var request = require('request');

  return {
    //Add or Update client-server connection
    addConnection: function(req, res) {
      //Map data
      var userId = req.params.id;
      var ip = req.connection.remoteAddress;
      var port = req.body.port;
      
      //Verify connection before saving to database
      if (verifyConnection(ip, port)) {
        Connection.create({
          userId: userId,
          IP: ip,
          Port: port,
          Verified: 1
        })
        .then(function() {
          Connection.findOrCreate({
            where: {userId: userId}
          })
        })
        .spread(function (connection, created) {
          res.send("Connection Verified");
        });
      //Unable to verify connection
      } else {
        Connection.create({
          userId: userId,
          IP: ip,
          Port: port,
          Verified: 0
        })
        .then(function() {
          Connection.findOrCreate({
            where: {userId: userId}
          })
        })
        .spread(function (connection, created) {
          res.send("Connection not verified");
        });
      }
    },
    //Verify Client-Server Connection
    verifyConnection: function(ip, port){
      //Make call to client-server using ip:port/verify
      return request.get("http://"+ip+":"+port+"/verify", function(err, res, body) {
        //Listen for response
        if (!error && res.statusCode === 200) {
          //Return true
          return 1;
        } else {
          //Return false
          return 0;
        }
      });
    },
  }; // End of return
};