//User Controller
module.exports = function (Users) { 
  var User = Users.User,
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
      .success(function (user) {
        //Verify password and username/email
        user.comparePasswords(password, function (err, isMatch) {
          if (isMatch) {
            req.session.save(function (err) {
              if (err) {
                console.log("Unable to save session: ", err);
              }
            });
            //Set session user id
            req.session.userid = user.id;
          } else {
            res.send("Unable to authenticate");
          }
        });
      });
    },

    //userLogout
    userLogout: function(req, res) {
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
    addUser: function(req, res) {
      var username = req.body.username,
          email = req.body.email,
          password = req.body.password;
      
      User.build({
        username: username,
        email: email, 
        password: password
      })
      .setToken()
      .save(function(user){
        //return userid also
        console.log("Saved user to database: ", user);
      })
      .catch(function(err){
        console.log("Error saving: ", err);
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
  }; //End return
};
