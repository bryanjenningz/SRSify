var srsApp = angular.module('srsApp', []);

srsApp.controller('srsCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('cards.json').then(function(cards) {
    $scope.cards = cards.data.sort(function(a, b) {
      return a.nextTime <= b.nextTime ? -1 : 1;
    });
    $scope.index = 0;
    $scope.card = $scope.cards[$scope.index];
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