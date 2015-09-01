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
      var file = req.body.file;
      //If user connection exists, update
      Connection.create({
        userId: userId,
        IP: ip,
        Port: port,
        File: file,
        //Field (bool) if connection has been verified
      })
      .then(function() {
        Connection.findOrCreate({
          where: {userId: userId}
        })
        .spread(function (connection, created) {
          //On success, verify connection
          verifyConnection(connection.IP, connection.Port);
          //Send new entry in response
          res.send(connection);
        });
      });
    },
    //Verify Client-Server Connection
    verifyConnection: function(ip, port){
      //Make call to client-server using ip:port/verify
      return request.post("http://"+ip+":"+port+"/verify", function(err, res, body) {
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