//Connection Controller
module.exports = function (Connections) {
  var Connection = Connections.Connections,
      request = require('request');

  //Add or Update client-server connection
  return {
    addConnection: function(req, res) {
      //Map data
      var userId = req.body.userid,
          ip = req.connection.remoteAddress,
          port = req.body.port;
      
      request.get("http://"+ip+":"+port+"/verify", function(err, response, body) {
        Connection.findOrCreate({
          where: {
            userId: userId,
            IP: ip,
            Port: port
          }
        }).spread(function(connection, created) {
          var verified = (!err && res.statusCode === 200);
          connection.updateAttributes({ Verified: verified}); 
          res.send("Connection" + (verified ? " is ": " is not " ) + "verified." );
        });
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
    },
  }; // End of return
};