angular.module('WordCtrl', []).controller('WordController', function($scope, $http) {
    var jsonRelations;
	$http.get('/relations.json').then(function(response) {
		jsonRelations = response.data;
	});
	$http.get('/api/words/chat').then(function(response) {
		jsonWord = response.data;
		console.log(jsonWord);

        var association = [];
        angular.forEach(jsonWord.entrant, function(value, key) {
            if(typeof association[value.association.type] === 'undefined'){
                association[value.association.type] = [];
            };
          association[value.association.type].push(value.mot);
        });
        console.log(association);

        $scope.cards = ['test'];
        console.log(association['r_action_lieu']);
        for (var key in association) {
            $scope.cards.push({
                "title" : key,
                "data" : association[key]
            });
        }
	});

    $scope.tagline = 'Nothing beats a pocket protector!';

});
