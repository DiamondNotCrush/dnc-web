angular
  .module('factory.user', [])
  .factory('user', ['$state','auth','session', function($state,auth,session) {
    function resetUser() {
      return {
        username: 'Anon',
        isAuthorized: false,
        id: 0
      };
    }
    var _user = this;
    
    _user.details = resetUser();

    _user.get = function() {
      var temp = session.get('user');
      if (temp && temp.isAuthorized) {
        _user.details = temp;
      }
    };

    _user.destroy = function() {
      session.destroy('user');
      _user.details = resetUser();
    };

    _user.store = function(user) {
      _user.details.username = user.username;
      _user.details.email = user.email;
      _user.details.id = user.id;
      _user.details.isAuthorized = user.id > 0;
      session.store('user', _user.details);
    };

    _user.auth = function(user, authtype, callback) {
        auth[authtype](user)
          .$promise
          .then(function(res) {
            _user.store(res);

            if (callback) {
              callback(null, _user.details);
            }
          })
          .catch(function(err){
            if (callback) {
              callback(err,null);
            }
          });
      };

    _user.update = function(data, callback) {
      data.id = _user.details.id;
      auth.update(data)
        .$promise
        .then(function(res){
          _user.store(res);

          if (callback) {
            callback(null, _user.details);
          }
        })
        .catch(function(err){
          if (callback) {
            callback(err, null);
          }
        });
    };

    return _user;
  }]);