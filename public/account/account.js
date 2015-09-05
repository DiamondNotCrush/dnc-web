angular
  .module('app.account', [])
  .controller('accountController', ['user', function(user){
    var _this = this;
    _this.user = user.details;
    
  }]);