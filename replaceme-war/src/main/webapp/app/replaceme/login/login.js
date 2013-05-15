namespace('replaceme.login');

replaceme.login.LoginController = function($scope, $http, $location) {

	$scope.login = function() {

        $http.post('rest/Login/login/' + $scope.userName + "/" + $scope.password).
            success(function(data, status, headers, config) {
                $location.path('/todo/list');
				
			}).error(function(data, status, headers, config) {
				console.log('error: status is: ' + status);
		});

	};
	
};