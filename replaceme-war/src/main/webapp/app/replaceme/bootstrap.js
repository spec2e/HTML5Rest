namespace('replaceme');

var replacemeModule = angular.module('ReplaceMe', [ 'ui.bootstrap', 'ngResource', 'ngCookies', 'ui.date' ]);

// Base REST URL for the entire data layer
replaceme.REST_BASE_URL = 'rest/';

replaceme.AUTHENTICATION_COOKIE = 'Authentication';

// Set up routes for the customer site
replacemeModule.config([ '$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {
        replaceme.setupRoutes($routeProvider);

        $httpProvider.responseInterceptors.push('errorHttpInterceptor');

    } ]);

replaceme.setupRoutes = function ($routepProvider) {

    $routepProvider.
        when('/login', {templateUrl: 'sites/replaceme/login/login.html', controller: replaceme.login.LoginController}).
        when('/home', {templateUrl: 'sites/replaceme/home/home.html', controller: replaceme.home.HomeController}).
        when('/todo/create', {templateUrl: 'sites/replaceme/todo/create.html', controller: replaceme.todo.CreateController}).
        when('/todo/show/:id', {templateUrl: 'sites/replaceme/todo/show.html', controller: replaceme.todo.ShowController}).
        when('/todo/update/:id', {templateUrl: 'sites/replaceme/todo/update.html', controller: replaceme.todo.UpdateController}).
        when('/todo/list', {templateUrl: 'sites/replaceme/todo/list.html'}).
        otherwise({redirectTo: '/home'});
};

replacemeModule.run(function ($rootScope, $location, errorService) {

    $rootScope.errorService = errorService;

    $rootScope.go = function (path) {
        $location.path(path);
    };

    $rootScope.$on('event:loginRequired', function () {
        $rootScope.go('/login');
    });

    $rootScope.alerts = [];
    $rootScope.alertsViewed = false;

    $rootScope.addSuccessMessage = function (msg) {
        $rootScope.alerts = [];
        var alert = {
            type: 'success',
            msg: msg
        };
        $rootScope.alerts.push(alert);
        $rootScope.alertsViewed = false;
    };

    $rootScope.addErrorMessage = function (msg) {
        $rootScope.alerts = [];
        var alert = {
            type: 'error',
            msg: msg
        };
        $rootScope.alerts.push(alert);
        $rootScope.alertsViewed = false;
    };

    $rootScope.closeAlert = function (index) {
        $rootScope.alerts.splice(index, 1);
    };

    // Reset the alerts...
    $rootScope.$on('$routeChangeSuccess', function (scope, next, current) {
        if ($rootScope.alertsViewed === true) {
            $rootScope.alerts = [];
        } else {
            $rootScope.alertsViewed = true;
        }
    });

});


// ngBlur directive

replacemeModule.directive('ngBlur', [ '$parse', function ($parse) {
    return function (scope, element, attr) {
        var fn = $parse(attr['ngBlur']);
        element.bind('blur', function (event) {
            scope.$apply(function () {
                fn(scope, {
                    $event: event
                });
            });
        });
    };
} ]);

replacemeModule.directive('ngFocus', function ($timeout) {
    return function (scope, elem, attrs) {
        scope.$watch(attrs.ngFocus, function (newval) {
            if (newval) {
                $timeout(function () {
                    elem[0].focus();
                }, 0, false);
            }
        });
    };
});

replacemeModule.directive('menuSelected', ['$location', function ($location) {
            return function (scope, element, attr) {
                // If the route changes we should probably also
                // change the selected menu item...
                scope.$on(
                    '$routeChangeSuccess',
                    function (scope, next, current) {
                        var url = $location.url();
                        // Take the link that is
                        // insiede the <li> element
                        var nestedLink = angular.element(element.children()[0]);
                        if (nestedLink) {
                            var menuUrl = nestedLink.attr('href');
                            if (!menuUrl) {
                                throw 'menuSelected: Could not find anchor tag! There must be a <a href...> tag inside the <li menu-selected...> tag.';
                            }
                            if (menuUrl.indexOf(url) > 0) {
                                element.addClass('active');
                            } else {
                                element.removeClass('active');
                            }
                        }

                    });
            };
        } ]);
