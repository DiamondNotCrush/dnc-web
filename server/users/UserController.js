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
        if (!user) {
          res.status(401).send({authorized: false});
        } else if (user.comparePasswords(req.body.password)) { 
          //save session
          // req.session.save(function (err) {
          //   if (err) {
          //     console.log("Unable to save session");
          //   }
          // });

          res.status(200).send({
            id: user.dataValues.id,
            username: user.dataValues.username,
            email: user.dataValues.email
          });
        } else {
          res.status(401).send({authorized: false});
        }
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
        res.send({
          id: user.dataValues.id,
          username: user.dataValues.username,
          email: user.dataValues.email
        });
      })
      .catch(function(err){
        res.status(500).send(err);
      });

    },

    updateUser: function(req, res) {
      User.update({
        username: req.body.username,
        email: decodeURIComponent(req.body.email),
      }, {
        where: {id: req.body.id}
      })
      .then(function (user) {
        res.send({
          id: user.dataValues.id,
          username: user.dataValues.username,
          email: user.dataValues.email
        });
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
    },

    findUser: function (req, res) {
      User.findOne({
        where: {id: req.params.id}
      })
      .then(function (user) {
        res.send({
          id: user.dataValues.id,
          username: user.dataValues.username,
          email: user.dataValues.email
        });
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
    },

    changePassword: function(req, res) {
      User.findOne({
        where: {id: req.body.id}
      })
      .then(function(user) {
        if (user.comparePasswords(req.body.oldPassword)) {
          user.updateAttributes({password: req.body.newPassword});
          res.status(201).send({success: true});
        } else {
          res.status(401).send({success: false, message: 'Password Incorrect'});
        }
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
    }
  }; //End return
};
