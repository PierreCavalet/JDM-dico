angular.module('WordCtrl', []).controller('WordController', ['$scope','$rootScope',
 '$http','$routeParams', function($scope, $rootScope, $http, $routeParams) {
  $rootScope.mot = $routeParams.word;
  $rootScope.showBar = true;
  $rootScope.showError = false;
  componentHandler.upgradeDom();

  // relation title
  var jsonRelations;
	$http.get('/relations.json').then(function(response) {
		jsonRelations = response.data;
	});

  // accessing the API
	$http.get('/api/words/' + $routeParams.word).then(function(response) {
		jsonWord = response.data;
    // if there is an error, hide the bar and display the error
    if (jsonWord.error) {
      $rootScope.showBar = false;
      $rootScope.showError = true;

      // error message handling
      if (jsonWord.error == "PARSINGERROR") {
        $scope.error = "Problème lors du parsing de l'XML (XML non valide)";
      } else if (jsonWord.error == "TIMEOUT") {
        $scope.error = "Délai d'attente dépassé";
      }
    } else {
      var association = [];

      // relations management
      angular.forEach(jsonWord.entrant, function(value, key) {
        if(typeof association[value.association.type] === 'undefined') {
          association[value.association.type] = [];
        }
        association[value.association.type].push({
            "texte" : value.mot,
            "poids" : value.association.poids
        });
      });
      angular.forEach(jsonWord.sortant, function(value, key) {
        if(typeof association[value.association.type] === 'undefined') {
          association[value.association.type] = [];
        }
        association[value.association.type].push({
            "texte" : value.mot,
            "poids" : value.association.poids
        });
      });

      // hide the bar and push the cards
      $rootScope.showBar = false;
      $scope.cards = [];
      for (var key in association) {
        console.log((jsonRelations[key] || "Relation non définie") + " : ");
        console.log(association[key]);
        $scope.cards.push({
          "title" : jsonRelations[key] || "Relation non définie",
          "data" : association[key],
          "limit" : 10,
          "show" : true
        });
      }
    }
	});

  $scope.delete = function(card) {
    var i = $scope.cards.indexOf(card);
    if(i != -1) {
    	$scope.cards.splice(i, 1);
    }
  };

  $scope.incrLimit = function(card) {
    card.limit = card.limit + 10;
  }

}]);
