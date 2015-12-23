angular.module('WordCtrl', []).controller('WordController', function($scope, $http) {
    var jsonRelations;
	$http.get('/relations.json').then(function(response) {
		jsonRelations = response.data;
	});
	$http.get('/words').then(function(response) {
		jsonWord = response.data;
		console.log(jsonWord);
		$scope.name = jsonWord["mot-formate"][0];
	});

    $scope.tagline = 'Nothing beats a pocket protector!';

});
