//Connection Controller
module.exports = function (Connections) {
  var Connection = Connections.Connections,
      request = require('request'),
      mime = require('mime-types');

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
            UserId: userId,
            IP: ip,
            Port: port
          }
        }).spread(function(connection, created) {
          var verified = (!err && response.statusCode === 200);
          connection.updateAttributes({ Verified: verified}); 
          res.send("Connection" + (verified ? " is ": " is not " ) + "verified." );
        }).catch(function (err) {
          res.status(500).send(err);
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
            res.send([]);
            return;
          }

          var baseUrl = "http://"+conn.IP+":"+conn.Port;
          request.get(baseUrl+"/library", function (err, response, body) {
            //On success, send JSON library to parse in view
            if (!err && response.statusCode === 200) {
              var results = [];
              for (var key in JSON.parse(body)) {
                var file = {};
                file.url = baseUrl+"/shared/"+key;
                file.mime = mime.lookup(key);
                file.name = decodeURIComponent(key).split('/').splice(-1)[0].split('.')[0];
                file.isAudio = file.mime.split('/')[0].toLowerCase() === "audio";
                file.isVideo = file.mime.split('/')[0].toLowerCase() === "video";

                results.push(file);


              }
              //Consider manipulating the data here to create an object of url, name, media type, isAudio, isVideo to offload this from the client side
              res.send(results);
            } else {
              console.log("Unable to fetch user library from client-server: ", err);
              res.send([]);
            }
          });
        });
    },
  }; // End of return
};