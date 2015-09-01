angular
  .module('app.main', [])
  .controller('mainController', ['user', function(user){
    var _this = this;
    _this.user = user.details;
    
  }]);