/*jslint browser : true, continue : true,
         devel : true, indent : 2, maxerr : 50,
         newcap : true, nomen : true, plusplus : true,
         regexp : true, sloppy : true, vars : false,
         white : false
*/
/*global namespace, replaceme*/

namespace('replaceme.login');

replaceme.login.LoginController = function ($scope, $http, $location) {

    $scope.login = function () {

        $http.post('rest/Login/login/' + $scope.userName + "/" + $scope.password).
            success(function (data, status, headers, config) {
                $location.path('/todo/list');

            }).error(function (data, status, headers, config) {
                console.log('error: status is: ' + status);
            });

    };

};