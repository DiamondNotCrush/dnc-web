var app = window.app = angular
  .module('app', [
  'ngAnimate',
  'ngResource',
  'ngCookies',
  'ui.router',
  'snap',
  'media',
  'app.main',
  'app.view',
  'app.login',
  'app.signup',
  'app.account',
  'factory.user',
  'service.view',
  'service.auth',
  'service.session'
  ])  
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$compileProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        controller: 'mainController',
        controllerAs: 'main',
        templateUrl: 'main/main.html',
        requiresLogin: true
      })
      .state('view', {
        url: '/',
        controller: 'viewController',
        controllerAs: 'view',
        templateUrl: 'view/view.html',
        parent: 'main',
        title: 'Media Player',
        requiresLogin: true
      })
      .state('login', {
        controller: 'loginController',
        controllerAs: 'login',
        templateUrl: 'login/login.html'
      })
      .state('signup', {
        controller: 'signupController',
        controllerAs:'signup',
        templateUrl:'signup/signup.html'
      })
      .state('account', {
        controller: 'accountController',
        controllerAs:'account',
        templateUrl:'account/account.html',
        parent: 'main',
        title: 'Account Settings',
        requiresLogin: true
      });

      $locationProvider.html5Mode(true);
      $compileProvider.debugInfoEnabled(false);
  }])
  .run(['$rootScope', '$state', 'user', function($rootScope, $state, user){
    user.get();
    $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams){
        if (toState.requiresLogin && !user.details.isAuthorized) {
          $state.transitionTo('login');
          event.preventDefault(); 
        }
      });
  }]);
angular
  .module('app.main', [])
  .controller('mainController', ['$state','user',function($state,user) {
    var _this = this;
    _this.state = $state;

    _this.logout  = function(){
      user.destroy();
      $state.go('login');
    };
  }]);
angular
  .module('app.view', [])
  .controller('viewController', ['view', 'user', function(view, user) {
    var _this = this;
    _this.user = user.details;
    _this.showAudio = false;
    _this.showVideo = true;
    _this.mediaSrc = '';

    _this.setFilter = function(filter) {
      _this.filter = '';

      if (filter === 'audio') {
        _this.filter = {isAudio: true};
      }

      if (filter === 'video') {
        _this.filter = {isVideo: true};
      }
    };

    _this.play = function(file) {
      // _this.mediaSrc = file.url;
      //Anti-pattern. Change to not alter DOM from controller.
      var video = document.getElementsByTagName('video')[0];
      video.src = file.url;
      video.load();
    };

    _this.getLibrary = function(){
      view.Files.query({id:_this.user.id})
        .$promise
        .then(function(files) {
          _this.files = files;
        });
    };

    _this.getLibrary();
  }]);
angular
  .module('service.view', [])
  .service('view', ['$resource', 'user', function($resource, user){
    return {
      Files: $resource('/connection/library/:id', {id: '@id'})
    };
  }]);

angular
  .module('service.auth', [])
  .service('auth', ['$resource', function($resource) {
    return $resource('', null, {
        login: {
          method: 'POST',
          url: '/user/login'
        },
        update: {
          method: 'POST',
          url: '/user/update'
        },
        register: {
          method: 'POST',
          url: '/user/addUser'
        },
        get: {
          method: 'GET',
          url: '/findUser/:id',
          params: {id:'@id'}
        }
      });
  }]);
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
angular
  .module('service.session', [])
  .service('session', ['$cookieStore', function ($cookieStore) {
    var localStoreAvailable = typeof (Storage) !== "undefined";
    var _this = this;
    
    function _store(name, data, persist) {
      persist = persist || false;

      if (localStoreAvailable) {
        if (angular.isObject(data) || angular.isArray(data) || angular.isNumber(+data || data)) {
          window[persist?'localStorage':'sessionStorage'].setItem(name, angular.toJson(data));
        }
      } else {
        $cookieStore.put(name, data);
      }
    }

    _this.store = function (name, details) {
      _store(name, details, false);
    };

    _this.persist = function (name, details) {
      _store(name, details, true);
    };

    _this.get = function (name) {
      return localStoreAvailable ? getItem(name) : $cookieStore.get(name);
    };

    _this.destroy = function (name) {
      if (localStoreAvailable) {
        localStorage.removeItem(name);
        sessionStorage.removeItem(name);
      } else {
        $cookieStore.remove(name);
      }
    };

    function getItem(name) {
      var data,
          localData = localStorage.getItem(name),
          sessionData = sessionStorage.getItem(name);

      data = sessionData || localData;

      if (data === '[object Object]') { return; }
      if (data === undefined || data === null || !data.length) { return; }

      if (data.charAt(0) === "{" || data.charAt(0) === "[" || angular.isNumber(data)) {
        return angular.fromJson(data);
      }

      return data;
    }

    return _this;
  }]);
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
angular
  .module('app.signup', [])
  .controller('signupController', ['user', function(user){
    var _this = this;
    _this.user = user.details;

    _this.register = function() {
      user.auth(_this.email, _this.password, 'signup', function() {});
    };
  }]);