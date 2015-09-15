angular
  .module('app.main', [])
  .controller('mainController', ['$state','user',function($state,user) {
    var _this = this;
    _this.state = $state;

    _this.logout  = function(){
      user.destroy();
      $state.go('login');
    };
  }]);