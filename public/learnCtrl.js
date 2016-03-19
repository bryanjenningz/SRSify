// A simple spaced-repetition card algorithm that allows the user to learn
// cards by having them appear very frequently in the beginning. Most 
// spaced-repetition algorithms show the cards less often because they assume
// the user has already learned the card and is simply reviewing.
// This simple algorithm doesn't make that assumption. Instead, it assumes the user 
// hasn't had any exposure to the card beforehand, so it allows enough repetition
// to occur to allow for learning then later reviewing.

// Each card will have the following data:
// {
//   front: string,
//   back: string,
//   lastSeen: new Date.getTime() integer,
//   points: integer total sum of all the user's scores
// }

// The following functions will act on the card data:
// nextTime(card) - returns the next time the card will be studied
// updateCard(score, card) - returns the card with newly added information

function nextTime(card) {
  // We want the time to start now for zero points, then in 1 minute for 1 point,
  // then double for each subsequent point added. Like this: 0: now, 1: 1 min,
  // 2: 2 min, 3: 4 min, 4: 8 min, 5: 16 min, 6: 32 min, 7: 64 min, ...
  var time = card.points > 0 ? 60000 * Math.pow(2, card.points) : 0; 
  return card.lastSeen + time;
}

function updateCard(score, card) {
  var SCORES = {'fail': -1, 'ok': 0, 'good': 1, 'perfect': 2};
  var points = SCORES[score] < 0 ? 1 : card.points + SCORES[score];
  return Object.assign({}, card, {
    lastSeen: new Date().getTime(),
    points: points
  });
}

var learnApp = angular.module('learnApp', []);

learnApp.controller('learnCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('cards.json').then(function(deck) {
    $scope.deck = deck.data.sort(function(a, b) {
      return a.nextTime <= b.nextTime ? -1 : 1;
    });
    $scope.total = Math.min(100, Number(localStorage.getItem('total')) || 10);
    localStorage.setItem('total', $scope.total);
    $scope.cards = $scope.deck.slice(0, $scope.goal);
    $scope.index = 0;
    $scope.card = $scope.cards[$scope.index];
    $scope.done = 0;
    $scope.failed = 0;
    $scope.rate = 100;
  });
  $scope.seenCards = {};


  $scope.addScore = function(score) {
    if (scores[score] === 0) {
      $scope.failed++;
    } else {
      $scope.done++;
    }
    if (!$scope.seenCards[$scope.index]) {
      $scope.seenCards[$scope.index] = true;
    }
    $scope.index += 1;
    if ($scope.index >= $scope.cards.length) {
      $scope.index = 0;
    }
    $scope.card = $scope.cards[$scope.index];
    $scope.isBackShown = false;
    $scope.rate = Math.floor(100 * $scope.done / ($scope.done + $scope.failed));
  };
}]);
