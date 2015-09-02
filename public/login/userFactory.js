angular
  .module('factory.user', [])
  .factory('user', function(){
    return {
     details: {
        name: '',
        isAuthorized: false,
        id: 0,
        ip: '',
        port: 0
      }
    };
  });