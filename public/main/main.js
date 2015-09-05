angular
  .module('app.main', [])
  .controller('mainController', ['$state','user', function($state,user){
    var _this = this;
    _this.user = user.details;
    _this.logout = function() {
      _this.user = { isAuthorized: false};
      $state.go('main');
    };
  }]);