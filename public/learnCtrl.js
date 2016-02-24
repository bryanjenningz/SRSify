var learnApp = angular.module('learnApp', []);

learnApp.controller('learnCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('cards.json').then(function(deck) {
    $scope.deck = deck.data.sort(function(a, b) {
      return a.nextTime <= b.nextTime ? -1 : 1;
    });
    $scope.total = Number(localStorage.getItem('total')) || 10;
    localStorage.setItem('total', $scope.total)
    $scope.cards = $scope.deck.slice(0, $scope.goal);
    $scope.index = 0;
    $scope.card = $scope.cards[$scope.index];
    $scope.done = 0;
    $scope.failed = 0;
    $scope.unseen = 0;
  });

  var scores = {
    'fail': 0,
    'pass': 1,
    'perfect': 2
  };

  $scope.addScore = function(score) {
    $scope.index += 1;
    if ($scope.index >= $scope.cards.length) {
      $scope.index = 0;
    }
    $scope.card = $scope.cards[$scope.index];
    $scope.isBackShown = false;
  };
}]);
