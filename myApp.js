angular.module('myApp', ['ngResource']).controller('myCtrl', function ($scope, Repo) {
    $scope.max_size = 0;
    $scope.min_forks = 1;
    $scope.min_stars = 1;
    $scope.getRepoFunc = function () {
        $scope.repos = Repo($scope).get();
    }
    $scope.orderProp = false;
    $scope.limit = 10;
});

angular.module('myApp').factory('Repo',
    function ($resource) {
        return function ($rootScope) {
            str = 'https://api.github.com/search/repositories?' + 'q=size:<' + $rootScope.max_size + '+forks:>=' + $rootScope.min_forks + '+stars:>=' + $rootScope.min_stars;
            return $resource(str);
            //return $resource('https://api.github.com/search/repositories', {}, {
            //    query: {
            //        method: 'GET', params: { q: 'size:<' + $rootScope.max_size + '+forks:>=' + $rootScope.min_forks + '+stars:>=' + $rootScope.min_stars }, isArray: true
            //    }
            //});
            //api.query(function (response) {
            //    callback(response.data);
            //});
        };
    });