//User Controller
module.exports = function (Users) { 
  var User = Users.User;
  var request = require("request");

  return {
    //userLogin
    userLogin: function(req, res, next) {
      // Add support to sign via username of email
      var regExp = /([a-zA-Z0-9\.])+(@){1}([a-zA-Z0-9]{2,4})/;
      var field = req.body.username.match(regExp) ? email : username;
      var id = req.body.username;
      var password = req.body.password;

      User.findOne({
        where: {field: username}
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
    fetchUserLibrary: function (ip, port) {
      //Make call to client-server 
      request.post("http://"+ip+":"+port+"/library", function (err, res, body) {
        //On success, send JSON library to parse in view
        if (!error && res.statusCode === 200) {
          //call function to parse in view
        } else {
          console.log("Unable to fetch user library from client-server: ", err);
        }
      });
    },
  }; //End return
};
