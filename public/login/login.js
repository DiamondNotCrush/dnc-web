angular
  .module('app.login', [])
  .controller('loginController', ['$state', 'user', function($state, user) {
    var _this = this;
    _this.email = '';
    _this.password = '';
    _this.register = false;

    _this.login = function(valid) {
      if (!valid) { return; }
      if (_this.register && _this.password2 !== _this.password) {
        _this.passwordMatch = false;
        return;
      }

      var details = _this.register ? 
        {email:_this.email, password:_this.password, username: _this.username} : 
        {email:_this.email, password:_this.password};

      user.auth(details, _this.register ? 'register' : 'login', function() {
        //Need to validate registration
        $state.go('view');
       });
    };

    if (user.isAuthorized) {
      $state.go('view');
    }
  }]);