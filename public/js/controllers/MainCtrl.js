angular.module('MainCtrl', []).controller('MainController', ['$scope', '$rootScope', '$location',  function($scope, $rootScope, $location) {
    $scope.myFunc = function(keyEvent) {
        if (keyEvent.which === 13) {
            $location.path('/words/' + $scope.searchbar);
            $rootScope.mot = $scope.searchbar;
        }
    };
    $scope.tagline = 'To the moon and back!';

}]);
