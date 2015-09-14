angular
  .module('factory.user', [])
  .factory('user', ['$state','auth', function($state,auth){
    var _user = this;
    
    _user.details = {
        username: 'Anon',
        isAuthorized: false,
        id: 0
      };

    _user.auth = function(user, authtype, callback) {
        auth[authtype](user)
          .$promise
          .then(function(res) {
            _user.details.username = res.username;
            _user.details.email = res.email;
            _user.details.id = res.id;
            _user.details.isAuthorized = res.id > 0;

            if (callback) {
              callback();
            }
          });
      };

    return _user;
  }]);