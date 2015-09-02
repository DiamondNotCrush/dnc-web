//Connection Controller
module.exports = function (Connections) {
  var Connection = Connections.Connections,
      request = require('request');

    //Add or Update client-server connection
  return {
     addConnection: function(req, res) {
      //Map data
      var userId = req.body.userid;
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
          });
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
          });
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
        var UserId = req.body.userid;
        var ip = req.connection.remoteAddress;
        var port = req.body.port;
        //If user connection exists, update
        if (verifyConnection(ip, port)) {
          Connection.findOrCreate({
            where: {
              UserId: UserId,
              IP: ip,
              Port: port
              //Field (bool) if connection has been verified
            }
          }).spread(function(connection, created){
            res.send(connection);
          });
        }
      });
    },
    //Query client-server for library
    fetchUserLibrary: function (req, res) {
      //Get connection ip and port from connections
      Connection
        .findOne({
          where: { UserId: req.params.id }
        })
        .then(function(conn) {
          if (!conn) {
            res.send({});
            return;
          }

          request.get("http://"+conn.IP+":"+conn.Port+"/library", function (err, response, body) {
            //On success, send JSON library to parse in view
            if (!err && res.statusCode === 200) {
              //Consider manipulating the data here to create an object of url, name, media type, isAudio, isVideo to offload this from the client side
              res.send(body);
            } else {
              console.log("Unable to fetch user library from client-server: ", err);
              res.send({});
            }
          });
        });

      //Make call to client-server 
    },
  }; // End of return
};