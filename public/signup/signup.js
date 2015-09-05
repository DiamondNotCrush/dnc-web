angular
  .module('app.signup', [])
  .controller('signupController', ['user', 'auth', function(user, auth){
    var _this = this;
    _this.user = user.details;
  }]);