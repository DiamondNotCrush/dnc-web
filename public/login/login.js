angular
  .module('app.login', [])
  .controller('loginController', ['$state', 'user', function($state, user){
    this.email = '';
    this.password = '';

    this.login = function(){

      user.login(this.email, this.password, function() {
        $state.go('view');
       });
    };

    if (user.isAuthorized) {
      $state.go('view');
    }
  }]);