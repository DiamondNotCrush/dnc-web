angular
  .module('app.main', [])
  .controller('mainController', ['$state',function($state){
    var _this = this;
    _this.state = $state;
  }]);