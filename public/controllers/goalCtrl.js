var goalApp = angular.module('goalApp', []);

goalApp.controller('goalCtrl', ['$scope', function($scope) {
  $scope.goal = Number(localStorage.getItem('goal')) || 10;
  $scope.setGoal = function() {
    if (Number($scope.goal)) {
      localStorage.setItem('goal', JSON.stringify(Number($scope.goal)));
    }
  };
}]);
