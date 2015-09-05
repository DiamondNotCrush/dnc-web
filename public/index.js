var app = window.app = angular
  .module('app', [
  'ngResource',
  'ui.router',
  'media',
  'app.main',
  'app.view',
  'app.login',
  'app.signup',
  'app.account',
  'factory.user',
  'service.view',
  'service.auth'
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
      })
      .state('signup', {
        controller: 'signupController',
        controllerAs:'signup',
        templateUrl:'signup/signup.html'
      })
      .state('account', {
        controller: 'accountController',
        controllerAs:'account',
        templateUrl:'account/account.html'
      });

      $locationProvider.html5Mode(true);
  }]);