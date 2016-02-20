var srsApp = angular.module('srsApp', ['ngRoute', 'homeApp', 'learnApp', 'decksApp', 'goalApp']);

srsApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home.html',
      controller: 'homeCtrl'
    })
    .when('/learn', {
      templateUrl: 'learn.html',
      controller: 'learnCtrl'
    })
    .when('/decks', {
      templateUrl: 'decks.html',
      controller: 'decksCtrl'
    })
    .when('/goal', {
      templateUrl: 'goal.html',
      controller: 'goalCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
