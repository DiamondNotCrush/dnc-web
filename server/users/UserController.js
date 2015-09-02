//User Controller
module.exports = function (Users, Connections) { 
  var User = Users.User,
      Connection = Connections.Connections,
      request = require("request");

  return {
    //userLogin
    userLogin: function(req, res, next) {
      // Add support to sign via username or email
      var regExp = /([a-zA-Z0-9\.])+(@){1}([a-zA-Z0-9]{2,4})/;
      var field = req.body.username.match(regExp) ? {email: req.body.username} : {username: req.body.username};
      var password = req.body.password;

      User.findOne({
        where: field
      })
      .then(function (user) {
        //Un-Hashed Check
        if (user.password === password) {
          res.send("User Validated");
        }
      })
      .catch(function (err) {
        console.log("Error verifying user: ", err);
      });
    },

    //userLogout
    userLogout: function(req, res) {

    },

    //Add user
    addUser: function(req, res) {
      var username = req.body.username,
          email = req.body.email,
          password = req.body.password;
      //Create user if user does not exist
      User.create({
        username: username,
        email: email, 
        password: password
      })
        .then(function (){
          User.findOrCreate({
            where: {username: username}
          })
          .spread(function (user, created) {
            res.send(user);
          });
        });
    },

    //updateUser
    updateUser: function(req, res) {
      var id = req.params.id;
      var username = req.body.username;
      var email = req.body.email;
      var password = req.body.password;

      User.update({
        username: username,
        email: email,
        password: password
      }, {
        where: {id: id}
      })
      .then(function (user) {
        res.send(user);
      })
      .catch(function (err) {
        console.log("Error updating user: ", err);
      });
    },
    //find user
    findUser: function (req, res) {
      var id = req.params.id;
      User.findOne({
        where: {id: id}
      })
      .then(function (user) {
        res.send(user);
      })
      .catch(function (err) {
        console.log("Error fetching user: ", err);
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
              res.sendStatus(500);
            }
          });
        });

      //Make call to client-server 
    },
  }; //End return
};
