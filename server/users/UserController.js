//User Controller
module.exports = function (Users) { 
  var User = Users.User,
      request = require("request");

  return {
    /*
     * userLogin finds the entry in the database that corresponds to either the username or email, 
     *  and then compares the password to the stored bcrypt hash
     *
     * Expected object in req.body:
     *  {
     *    username: <string>,
     *    email: <string>,
     *    password: <string>
     *  }
     *
     *  Returns:
     *  {
     *    id: <number>,
     *    username: <string>,
     *    email: <string>
     *  }
     */
    userLogin: function(req, res) {
      var field = {};
      if (req.body.email) {
        field.email = decodeURIComponent(req.body.email);
      } else {
        var regExp = /([a-zA-Z0-9\.])+(@){1}([a-zA-Z0-9]{2,4})/; //Used to check if an email address was sent as the username.
        field = decodeURIComponent(req.body.username).match(regExp) ? {email: req.body.username} : {username: req.body.username};
      }

      User.findOne({
        where: field
      })
      .then(function (user) {
        userHelper(user, req.body.password, res, function(){ sendUser(user, res); });
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
    },

    // userLogout: function (req, res) {
    //   //destroy session
    //   req.session.destroy(function (err) {
    //     if (err) {
    //       console.log("Unable to destroy session: ", err);
    //     }
    //   });
    //   res.redirect(301, "/");
    //   res.send();
    // },


    /*
     * addUser creates a new entry in the database for the user
     *
     * Expected object in req.body:
     *  {
     *    username: <string>,
     *    email: <string>,
     *    password: <string>
     *  }
     *
     *  Returns:
     *  {
     *    id: <number>,
     *    username: <string>,
     *    email: <string>
     *  }
     */
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
        sendUser(user, res);
      })
      .catch(function(err){
        res.status(500).send(err);
      });

    },

    /*
     * udpateUser updates the entry in the db for the user if the user exists.
     *
     * Expected object in req.body:
     *  {
     *    id: <number>,
     *    password: <string>,
     *    email: <string>, -- Only if changing
     *    newPassword: <string> -- Only if changing
     *  }
     *
     *  Returns:
     *  {
     *    id: <number>,
     *    username: <string>,
     *    email: <string>,
     *    status: [<string>]
     *  }
     */
    updateUser: function(req, res) {
      User.findOne({
        where: {id: req.body.id}
      })
      .then(function (user) {
        userHelper(user, req.body.password, res, function() {
          var status = [];
          if (req.body.email && req.body.email.length) {
            user.updateAttributes({email: decodeURIComponent(req.body.email)});
            status.push('Email address changed.');
          }

          if (req.body.newPassword && req.body.newPassword.length) {
            user.updateAttributes({password: req.body.newPassword});
            status.push('Password changed.');
          }

          if (status.length > 0) {
            User.findOne({
              where: {id: req.body.id}
            }).then(function(user){
              res.status(201).send({
                id: user.dataValues.id,
                username: user.dataValues.username,
                email: user.dataValues.email,
                status: status
              });
            });
          } else {
            res.status(200).send({
              id: user.dataValues.id,
                username: user.dataValues.username,
                email: user.dataValues.email,
                status: ['No changes made.']
            });
          }
        });
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
    },

    /*
     * findUser returns the user from the db.
     *
     * Expects id as a parameter: e.g. /3
     *  
     *  Returns:
     *  {
     *    id: <number>,
     *    username: <string>,
     *    email: <string>
     *  }
     */
    findUser: function (req, res) {
      User.findOne({
        where: {id: req.params.id}
      })
      .then(function (user) {
        sendUser(user, res);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
    },
  }; //End return
};

function userHelper(user, pass, res, callback) {
  if (!user) {
    res.status(401).send({authorized: false});
  } else if (user.comparePasswords(pass)) { 
    callback(user);
  } else {
    res.status(401).send({authorized: false});
  }
}

function sendUser(user, res) {
  res.status(200).send({
    id: user.dataValues.id,
    username: user.dataValues.username,
    email: user.dataValues.email
  });
}
