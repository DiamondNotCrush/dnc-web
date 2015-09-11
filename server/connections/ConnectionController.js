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
          ip = req.body.ip || req.ip,
          port = req.body.port;
      
      request({
        uri: 'http://'+ip+':'+port+'/verify',
        method: 'GET',
        timeout: 5000
      }, function(err, response, body) {
        var verified = (!err && response.statusCode === 200);
        Connection.findOrCreate({
          where: {
            UserId: userId
          }
        }).spread(function(connection, created) {
          connection.updateAttributes({ Verified: verified, IP: ip, Port: port}); 
          res.status(201).send({ip: ip, port: port, verified: verified});
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

          var baseUrl = 'http://'+conn.IP+':'+conn.Port;
          request.get(baseUrl+'/library', function (err, response, body) {
            //On success, send JSON library to parse in view
            if (!err && response.statusCode === 200) {
              var results = [];
              var library = JSON.parse(body);
              for (var key in library) {
                var file = {};
                file.url = baseUrl+'/shared/'+key;
                file.mime = mime.lookup(key);
                file.name = decodeURIComponent(key).split('/').splice(-1)[0].split('.')[0];
                file.isAudio = file.mime.split('/')[0].toLowerCase() === 'audio';
                file.isVideo = file.mime.split('/')[0].toLowerCase() === 'video';
                file.picture = library[key];

                results.push(file);


              }
              //Consider manipulating the data here to create an object of url, name, media type, isAudio, isVideo to offload this from the client side
              res.send(results);
            } else {
              console.log('Unable to fetch user library from client-server: ', err);
              res.send([]);
            }
          });
        })
        .catch(function(err) {
          res.status(500).send(err);
        });
    },
    verifyConnection: function(req,res) {
      var ip = req.body.ip || req.ip,
          port = req.body.port;
      
      request({
        uri: 'http://'+ip+':'+port+'/verify',
        method: 'GET',
        timeout: 5000
      }, function(err, response, body) {
        if (!err && response.statusCode === 200) {
          res.status(200).send({ip: ip, port: port, verified: true});
        } else {
          res.status(504).send({ip: ip, port: port, verified: false});
        }
      });
    }
  }; // End of return
};