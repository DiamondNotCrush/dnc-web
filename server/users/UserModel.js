//User Model
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
  }, {
    instanceMethods: {
      setToken: function () {
        var defer = Q.defer();
        // only hash password if it has been modified or is new
        if (!this.changed("password")) {
          return;
        }
        //generate salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
          if (err) {
            console.log("Error generating salt: ", err);
          }
          //hash password
          bcrypt.hash(this.password, salt, null, function (err, hash) {
            if (err) {
              defer.reject(err);
            } else {
              defer
            }
            //Set password and salt  
            this.password = hash;
            this.salt = salt;
          });
        });

        return this;
      },

      comparePasswords: function (candidatePassword, hashedPassword) {
        var defer = Q.defer();
        var savedPassword = this.password;
        bcrypt.compare(candidatePassword, hashedPassword, function (err, isMatch) {
          if (err) {
            defer.reject(err);
          } else {
            defer.resolve(isMatch);
          }
        });
        return defer.promise;
      }
    }
  });

  return {
    User: User,
  }; //End of return
};

