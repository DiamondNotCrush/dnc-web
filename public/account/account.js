angular
  .module('app.account', [])
  .controller('accountController', ['$state', 'user', 'auth', function($state, user, auth){
    var _this = this;
    _this.currentPassword = '';
    _this.newPassword = '';
    _this.confirmPassword = '';
    _this.newEmail = '';
    
    _this.updatePassword = function(valid) {
      if (!valid) { return; }
      if (_this.confirmPassword !== _this.newPassword) {
        _this.passwordMatch = false;
      } else {
        auth.update({id: user.details.id, password: _this.currentPassword, newPassword: _this.newPassword})
          .$promise
          .then(function(res) {
            //Check for errors in return message
           

            //redirect to library
            $state.go('view');
          });
      }
    };
    
    _this.updateEmail = function(valid) {
      if (!valid) { return; }
      auth.update({id: user.details.id, password: _this.currentPassword, email: _this.newEmail})
        .$promise
        .then(function(res) {
          //Check for errors in return message


          //redirect to library
          $state.go('view');
        });
    };
  }]);