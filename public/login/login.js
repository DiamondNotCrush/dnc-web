angular
  .module('app.login', [])
  .controller('loginController', ['$state', 'user', function($state, user) {
    var _this = this;
    _this.userDetails = user.details;
    _this.email = '';
    _this.password = '';
    _this.register = false;

    if (_this.userDetails && _this.userDetails.isAuthorized) {
      $state.go('view');
    }

    _this.login = function(valid) {
      if (!valid) { return; }
      if (_this.register && _this.password2 !== _this.password) {
        _this.passwordMatch = false;
        return;
      }

      var details = _this.register ? 
        {email:_this.email, password:_this.password, username: _this.username} : 
        {email:_this.email, password:_this.password};

      user.auth(details, _this.register ? 'register' : 'login', function(err,res) {
        if(err || !res || !res.isAuthorized) {
          _this.password = '';
          _this.password2 = '';
          _this.invalidLogin = true;
        } else {
          $state.go('view');
        }
       });
    };

  }]);