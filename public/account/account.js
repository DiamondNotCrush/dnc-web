angular
  .module('app.account', [])
  .controller('accountController', ['$state','user',function($state,user) {
    var _this = this;
    _this.currentPassword = '';
    _this.newPassword = '';
    _this.confirmPassword = '';
    _this.newEmail = '';
    
    _this.update = function(valid) {
      if (!valid) { return; }
     
      user.update({password: _this.currentPassword, newPassword: _this.newPassword, email: _this.newEmail}, function(err,res) {
        if(err) {
          //Do error stuff
        } else {
          $state.go('view');
        }
      });
    };

    _this.updatePassword = function(valid) {
      if (!valid) { return; }
      if (_this.confirmPassword !== _this.newPassword) {
        _this.passwordMatch = false;
      } else {
        _this.update(true);
      }
    };
  }]);