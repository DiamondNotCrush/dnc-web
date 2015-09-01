angular
  .module('app.login', [])
  .controller('loginController', ['$state', 'user', function($state, user){
    this.login = function(){
      user.details.name = 'Owen';
      user.details.ip = 'http://99.9.62.40';
      user.details.port = 3000;
      user.details.id = 2;
      user.details.isAuthorized = true;

      $state.go('view');
    };
  }]);