namespace('replaceme');

var replacemeModule = angular.module('ReplaceMe', ['ui.bootstrap', 'ngResource']);

//Base REST URL for the entire data layer
replaceme.REST_BASE_URL = 'rest/';

//Set up routes for the customer site
replacemeModule.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/home', {templateUrl: 'sites/replaceme/home/home.html', controller: replaceme.home.HomeController}).
        when('/todo/create', {templateUrl: 'sites/replaceme/todo/create.html', controller: replaceme.todo.CreateController}).
        when('/todo/show/:id', {templateUrl: 'sites/replaceme/todo/show.html', controller: replaceme.todo.ShowController}).
        when('/todo/update/:id', {templateUrl: 'sites/replaceme/todo/update.html', controller: replaceme.todo.UpdateController}).
        when('/todo/list', {templateUrl: 'sites/replaceme/todo/list.html', controller: replaceme.todo.ListController}).
        otherwise({redirectTo: '/home'});
}]);



