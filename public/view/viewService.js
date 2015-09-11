angular
  .module('service.view', [])
  .service('view', ['$resource', 'user', function($resource, user){
    return {
      Files: $resource('/connection/library/:id', {id: '@id'})
    };
  }]);
