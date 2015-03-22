angular.module('myApp', ['ngResource']).controller('myCtrl', function ($scope, Repo, LangContrib) {
    $scope.max_size = 0;
    $scope.min_forks = 1;
    $scope.min_stars = 1;
    $scope.getRepoFunc = function () {
        var rep = Repo($scope).get();
        $scope.repos = LangContrib(rep);
    }
    $scope.orderProp = false;
    $scope.limit = 10;
});

angular.module('myApp').factory('Repo',
    function ($resource) {
        return function ($rootScope) {
            str = 'https://api.github.com/search/repositories?' + 'q=size:<' + $rootScope.max_size + '+forks:>=' + $rootScope.min_forks + '+stars:>=' + $rootScope.min_stars;
            return $resource(str);
        };
    });

angular.module('myApp').factory('LangContrib',
    function ($resource) {
        return function (repos) {
            for (repo in repos) {
                langStr = 'https://api.github.com/repos/' + repo.items.full_name + '/languages';
                contribStr = 'https://api.github.com/repos/' + repo.items.full_name + '/contributors';
                repo.lang = $resource(langStr).get();
                repo.contrib = $resource(contribStr).get();
                alert(repo.lang);
            }
            return repos;
        };
    });