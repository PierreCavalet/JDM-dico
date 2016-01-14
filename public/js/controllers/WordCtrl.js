angular.module('WordCtrl', []).controller('WordController', function($scope, $http) {
    var jsonRelations;
	$http.get('/relations.json').then(function(response) {
		jsonRelations = response.data;
	});
	$http.get('/api/words/chat').then(function(response) {
		jsonWord = response.data;

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
                "title" : jsonRelations[key] || "Reliation non défini",
                "data" : association[key],
                "show" : true
            });
        }
	});

    $scope.tagline = 'Nothing beats a pocket protector!';

    $scope.delete = function(card) {
        return card.show = false;
    };

});
