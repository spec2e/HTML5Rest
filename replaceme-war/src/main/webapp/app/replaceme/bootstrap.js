/*jslint browser : true, continue : true,
         devel : true, indent : 2, maxerr : 50,
         newcap : true, nomen : true, plusplus : true,
         regexp : true, sloppy : true, vars : false,
         white : false
*/
/*global replaceme, namespace, angular*/

namespace('replaceme');

//Name of the module that is used in this app
var replacemeModule = angular.module('ReplaceMe', [ 'ui.bootstrap', 'ngResource', 'ngCookies', 'ui.date' ]);

// Base REST URL for the entire data layer
replaceme.REST_BASE_URL = 'rest/';

//The name of the authentication cookie
replaceme.AUTHENTICATION_COOKIE = 'Authentication';

//The name of the event that is fired, when a login is required
replaceme.LOGIN_REQUIRED_EVENT = 'event:loginRequired';


//Configure the module
replacemeModule.config([ '$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {

        //Set up routes for the customer site
	    $routeProvider.
            when('/login', {templateUrl: 'sites/replaceme/login/login.html', controller: replaceme.login.LoginController}).
            when('/home', {templateUrl: 'sites/replaceme/home/home.html', controller: replaceme.home.HomeController}).
            when('/todo/create', {templateUrl: 'sites/replaceme/todo/create.html', controller: replaceme.todo.CreateController}).
            when('/todo/show/:id', {templateUrl: 'sites/replaceme/todo/show.html', controller: replaceme.todo.ShowController}).
            when('/todo/update/:id', {templateUrl: 'sites/replaceme/todo/update.html', controller: replaceme.todo.UpdateController}).
            when('/todo/list', {templateUrl: 'sites/replaceme/todo/list.html'}).
            otherwise({redirectTo: '/home'});

        //Set up an HTTP error interceptor
        $httpProvider.responseInterceptors.push('errorHttpInterceptor');
    }
]);

replacemeModule.run(function ($rootScope, $location, alertService, $http, $cookieStore) {

    $rootScope.alertService = alertService;

    //Listen for the login required event...
    $rootScope.$on(replaceme.LOGIN_REQUIRED_EVENT, function () {
        //If fired - go to the login page
        $location.path('/login');
    });

    $rootScope.logout = function () {
        $http.post('rest/Login/logout/').
            success(function (data, status, headers, config) {
                //Remove the authentication cookie
                $cookieStore.put(replaceme.AUTHENTICATION_COOKIE, '');
                $location.path("/home");
            }).error(function (data, status, headers, config) {
                //Remove the authentication cookie anyway...
                $cookieStore.put(replaceme.AUTHENTICATION_COOKIE, '');
                $location.path("/home");
            });
    };

});


