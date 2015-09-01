var app = window.app = angular
  .module('app', [
  'ngResource',
  'ui.router',
  'app.main',
  'app.view',
  'app.login',
  'factory.user',
  'service.view'
  ])  
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        controller: 'mainController',
        controllerAs: 'main',
        templateUrl: 'main/main.html'
      })
      .state('view', {
        controller: 'viewController',
        controllerAs: 'view',
        templateUrl: 'view/view.html'
      })
      .state('login', {
        controller: 'loginController',
        controllerAs: 'login',
        templateUrl: 'login/login.html'
      });

      $locationProvider.html5Mode(true);
  }]);