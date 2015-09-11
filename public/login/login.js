angular
  .module('app.login', [])
  .controller('loginController', ['$state', 'user', function($state, user){
    this.email = '';
    this.password = '';

    this.login = function(){
      user.auth(this.email, this.password, 'login', function() {
        $state.go('view');
       });
    };

    if (user.isAuthorized) {
      $state.go('view');
    }
  }]);