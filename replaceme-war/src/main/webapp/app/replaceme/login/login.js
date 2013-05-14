namespace('replaceme.login');

replaceme.login.LoginController = function($scope, authHttp, todoService) {
	
	$scope.userName;
	$scope.password;
	
	$scope.login = function() {
		
		var postData = {
				userName: $scope.userName,
				password: $scope.password
		};
		
		authHttp.post('rest/Login/login/' + $scope.userName + "/" + $scope.password, postData).
			success(function(data, status, headers, config) {
				console.log('success: status is: ' + status);
				
			}).error(function(data, status, headers, config) {
				console.log('error: status is: ' + status);
		});
		
	};
	
};