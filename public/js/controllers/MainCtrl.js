angular.module('MainCtrl', []).controller('MainController', ['$scope', '$location',  function($scope, $location) {
    $scope.myFunc = function(keyEvent) {
        if (keyEvent.which === 13) {
            $location.path('/words/' + $scope.searchbar);
        }
    };
    $scope.tagline = 'To the moon and back!';

}]);
