angular
  .module('app.signup', [])
  .controller('signupController', ['user', function(user){
    var _this = this;
    _this.user = user.details;

    _this.register = function() {
      user.auth(_this.email, _this.password, 'signup', function() {});
    };
  }]);