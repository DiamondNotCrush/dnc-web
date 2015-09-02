angular
  .module('app.login', [])
  .controller('loginController', ['$state', 'user', function($state, user){
    this.login = function(){
      user.details.username = 'Owen';
      user.details.ip = '99.9.62.40';
      user.details.port = 3000;
      user.details.id = 1;
      user.details.isAuthorized = true;

      $state.go('view');
    };
  }]);