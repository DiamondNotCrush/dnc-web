//Connection Controller
module.exports = function (Connections) {
  var Connection = Connections.Connections,
      request = require('request');

  function verifyConnection(ip, port) {
    return request.post("http://"+ip+":"+port+"/verify", function(err, res, body) {
      //Listen for response
      if (!err && res.statusCode === 200) {
        //Return true
        return 1;
      } else {
        //Return false
        return 0;
      }
    });
  }

    //Add or Update client-server connection
  return {
     addConnection: function(req, res) {
      //Map data
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
    },
    verifyConnection: verifyConnection,
  }; // End of return
};