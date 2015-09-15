var app = window.app = angular
  .module('app', [
  'ngAnimate',
  'ngResource',
  'ngCookies',
  'ui.router',
  'snap',
  'media',
  'app.main',
  'app.view',
  'app.login',
  'app.signup',
  'app.account',
  'factory.user',
  'service.view',
  'service.auth',
  'service.session'
  ])  
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        controller: 'mainController',
        controllerAs: 'main',
        templateUrl: 'main/main.html',
        requiresLogin: true
      })
      .state('view', {
        url: '/',
        controller: 'viewController',
        controllerAs: 'view',
        templateUrl: 'view/view.html',
        parent: 'main',
        title: 'Media Player',
        requiresLogin: true
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
        templateUrl:'account/account.html',
        parent: 'main',
        title: 'Account Settings',
        requiresLogin: true
      });

      $locationProvider.html5Mode(true);
  }])
  .run(['$rootScope', '$state', 'user', function($rootScope, $state, user){
    user.get();
    $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams){
        if (toState.requiresLogin && !user.details.isAuthorized) {
          $state.transitionTo('login');
          event.preventDefault(); 
        }
      });
  }]);