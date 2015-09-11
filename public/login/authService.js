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