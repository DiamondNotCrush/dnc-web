var Sequelize = require("sequelize");

module.exports = function (sequelize) {
  var bcrypt    = require("bcrypt-nodejs");
  var Q         = require("q");
  var SALT_WORK_FACTOR = 10;
  
  var User = sequelize.define("Users", {
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    salt: Sequelize.STRING
  });

  // User.hook("beforeValidate", function (next) {
  //   var user = this;

  //   // only hash password if it has been modified or is new
  //   if (!user.changed("password")) {
  //     return next();
  //   }

  //   //generate a salt
  //   bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
  //     if (err) {
  //       return next(err);
  //     }

  //     //override the cleartext password with the hashed one
  //     user.password = hash;
  //     user.salt = salt;
  //     next();
  //   });

  // });

  return {
    User: User,

    comparePasswords: function (candidatePassword) {
      var defer = Q.defer();
      var savedPassword = this.password;
      bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
        if (err) {
          defer.reject(err);
        } else {
          defer.resolve(isMatch);
        }
      });
      return defer.promise;
    }
  }; //End of return
};

