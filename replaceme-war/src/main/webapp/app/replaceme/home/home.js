/*jslint browser : true, continue : true,
         devel : true, indent : 2, maxerr : 50,
         newcap : true, nomen : true, plusplus : true,
         regexp : true, sloppy : true, vars : false,
         white : false
*/
/*global namespace, replaceme*/
namespace('replaceme.home');

replaceme.home.HomeController = function ($scope, $routeParams, $resource) {

    $scope.message = "Welcome to the HTML5/REST demo app :-)";

};
