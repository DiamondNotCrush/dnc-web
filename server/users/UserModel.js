//User Model
var Sequelize = require("sequelize");

module.exports = function (sequelize) {
  var bcrypt    = require("bcrypt-nodejs");
  var Q         = require("q");
  var SALT_WORK_FACTOR = 10;
  
  var User = sequelize.define("Users", {
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: {
      type: Sequelize.STRING,
      set: function (val) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(val, salt);

        this.setDataValue("password", hash);
      }
    }
  }, {
    instanceMethods: {
      comparePasswords: function (candidatePassword) {
        var savedPassword = this.password;
        return bcrypt.compareSync(candidatePassword, savedPassword);
      }
    }
  });

  return {
    User: User,
  }; //End of return
};

