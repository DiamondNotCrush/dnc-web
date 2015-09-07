//User Controller
module.exports = function (Users) { 
  var User = Users.User,
      request = require("request");

  return {

    //userLogin
    userLogin: function(req, res) {
      // Add support to sign via username or email
      var field = {};
      if (req.body.email) {
        field.email = decodeURIComponent(req.body.email);
      } else {
        var regExp = /([a-zA-Z0-9\.])+(@){1}([a-zA-Z0-9]{2,4})/;
        field = decodeURIComponent(req.body.username).match(regExp) ? {email: req.body.username} : {username: req.body.username};
      }

      var password = req.body.password;

      User.findOne({
        where: field
      })
      .then(function (user) {
        //Check if supplied password matches stored password
        if (user.comparePasswords(password)) {
          
          //save session
          req.session.save(function (err) {
            if (err) {
              console.log("Unable to save session");
            }
          });

          //build user response object
          var userObj = {
            id: user.dataValues.id,
            username: user.dataValues.username,
            email: user.dataValues.email
          };
          //return user object
          res.send(userObj);
        } else {
          //send empty object (for now) when not auth'ed
          res.send({});
        }
      })
      .catch(function (err) {
        console.log("Error logging user in: ", err);
      });
    },

    //userLogout
    userLogout: function (req, res) {
      //destroy session
      req.session.destroy(function (err) {
        if (err) {
          console.log("Unable to destroy session: ", err);
        }
      });
      res.redirect(301, "/");
      res.send();
    },

    //Add user
    addUser: function (req, res) {
      var username = decodeURIComponent(req.body.username),
          email = decodeURIComponent(req.body.email),
          password = req.body.password;
      
      User.create({
          username: username,
          email: email,
          password: password
        })
      .then(function (user) {
        //build user response object
        var userObj = {
          id: user.dataValues.id,
          username: user.dataValues.username,
          email: user.dataValues.email
        };
        //return user object
        res.send(userObj);
      })
      .catch(function(err){
        res.status(500).send(err);
      });

    },

    //updateUser
    updateUser: function(req, res) {
      var id = req.params.id;
      var username = req.body.username;
      var email = req.body.email;

      User.update({
        username: username,
        email: email,
      }, {
        where: {id: id}
      })
      .then(function (user) {
        //build user response object
        var userObj = {
          id: user.dataValues.id,
          username: user.dataValues.username,
          email: user.dataValues.email
        };
        //return user object
        res.send(userObj);
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
        //build user response object
        var userObj = {
          id: user.dataValues.id,
          username: user.dataValues.username,
          email: user.dataValues.email
        };
        //return user object
        res.send(userObj);
      })
      .catch(function (err) {
        console.log("Error fetching user: ", err);
      });
    },
  }; //End return
};
