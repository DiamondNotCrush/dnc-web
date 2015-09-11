angular
  .module('app.account', [])
  .controller('accountController', ['user', 'auth', function(user, auth){
    var _this = this;
    _this.user = user.details;
    
    //update password
    _this.updatePassword = function(currentPassword, newPassword) {
      auth.update({id: _this.user.id, password: currentPassword, newPassword: newPassword})
        .$promise
        .then(function(res) {
          //do something with response
        });
    },
    //update email
    _this.updateEmail = function(password, newEmail) {
      auth.update({id: _this.user.id, password: password, email: newEmail})
        .$promise
        .then(function(res) {
          //do something with response
        });
    }
  }]);