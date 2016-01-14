angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        .when('/words/:word', {
            templateUrl: 'views/word.html',
            controller: 'WordController'
        });

    $locationProvider.html5Mode(true);

}]);
