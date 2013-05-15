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
