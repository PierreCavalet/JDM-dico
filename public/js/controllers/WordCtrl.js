angular.module('WordCtrl', []).controller('WordController', ['$scope', '$rootScope', '$http','$routeParams', function($scope, $rootScope, $http, $routeParams) {
    var jsonRelations;
	$http.get('/relations.json').then(function(response) {
		jsonRelations = response.data;
	});
	$http.get('/api/words/' + $routeParams.word).then(function(response) {
		jsonWord = response.data;

        console.log(jsonWord);
        $rootScope.mot = $routeParams.word;
        var association = [];
        angular.forEach(jsonWord.entrant, function(value, key) {
            if(typeof association[value.association.type] === 'undefined'){
                association[value.association.type] = [];
            };
          association[value.association.type].push(value.mot);
        });

        $scope.cards = [];
        for (var key in association) {
            $scope.cards.push({
                "title" : jsonRelations[key] || "Relation non définie",
                "data" : association[key],
                "show" : true
            });
        }
	});

    $scope.tagline = 'Nothing beats a pocket protector!';

    $scope.delete = function(card) {
        return card.show = false;
    };
    // TODO Mettre une barre de chargement temps indéterminé

}]);
