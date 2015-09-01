angular
  .module('service.view', [])
  .service('view', ['$resource', 'user', function($resource, user){
    return {
      File: $resource('', null, {
        connections: {
          method: 'POST',
          url: '/connect'
        },
        files: {
          method: 'GET',
          url: user.details.ip + ':' + user.details.port + '/library' //Could test encodeURI()
        }
      })
    };
  }]);