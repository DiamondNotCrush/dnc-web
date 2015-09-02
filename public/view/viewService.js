angular
  .module('service.view', [])
  .service('view', ['$resource', 'user', function($resource, user){
    return {
      Files: $resource('/user/library/:id', {id: '@id'})
    };
  }]);
