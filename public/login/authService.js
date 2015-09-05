angular
  .module('service.auth', [])
  .service('auth', ['$resource', 'user', function($resource, user){
    return {
      login: $resource('/user/login')
    };
  }]);
