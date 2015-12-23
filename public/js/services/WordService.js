angular.module('WordService', []).factory('Word', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/api/words');
        }
    }

}]);
