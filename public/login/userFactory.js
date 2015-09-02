angular
  .module('factory.user', [])
  .factory('user', function(){
    return {
     details: {
        name: '',
        isAuthorized: false,
        id: 1,
        ip: '',
        port: 0
      }
    };
  });