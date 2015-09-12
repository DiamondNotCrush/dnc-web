angular
  .module('app.account', [])
  .controller('accountController', ['$state', 'user', 'auth', function($state, user, auth){
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.newEmail = '';
    
    //update password
    this.updatePassword = function() {
      if (this.confirmPassword !== this.newPassword) {
        //trigger error on page
      } else {
        auth.update({id: user.details.id, password: this.currentPassword, newPassword: this.newPassword})
          .$promise
          .then(function(res) {
            //redirect to library
            $state.go('view');
          });
      }
    };
    
    //update email
    this.updateEmail = function() {
      auth.update({id: user.details.id, password: this.currentPassword, email: this.newEmail})
        .$promise
        .then(function(res) {
          //redirect to library
          $state.go('view');
        });
    };
  }]);