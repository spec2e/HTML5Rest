namespace('replaceme.services');

replacemeModule.factory('errorService', function() {

	var errorMessage, setError, clear;

	setError = function(msg) {
		console.log("errorService.setError");
		this.errorMessage = msg;
	};

	clear = function() {
		this.errorMessage = null;
	};

	return {
		errorMessage : errorMessage,
		setError : setError,
		clear : clear
	};

});

replacemeModule.factory('errorHttpInterceptor',	function($q, $location, errorService, $rootScope) {
			return function(promise) {
				return promise.then(
						function(response) {
							return response;
						},
						function(response) {
							if (response.status === 401) {
								$rootScope.$broadcast('event:loginRequired');
							} else if (response.status >= 400 && response.status < 500) {
								errorService.setError("Could not find the service you were looking for!");
							}
							return $q.reject(response);
						});
			};
});


replacemeModule.factory('Authentication', function() {
	  return {
		    getTokenType: function() {
		      return 'Awesome';
		    },
		    getAccessToken: function() {
		      // Fetch from the server in real life
		      return 'asdads131321asdasdasdas';
		    }
	  };
});

replacemeModule.factory('authHttp', function($http, Authentication) {
	var authHttp = {};
	// Append the right header to the request
	var extendHeaders = function(config) {
		config.headers = config.headers || {};
		config.headers['Authentication'] = Authentication.getTokenType() + ' '
				+ Authentication.getAccessToken();
	};
	// Do this for each $http call
	angular.forEach([ 'get', 'delete', 'head', 'jsonp' ], function(name) {
		authHttp[name] = function(url, config) {
			config = config || {};
			extendHeaders(config);
			return $http[name](url, config);
		};
	});
	angular.forEach([ 'post', 'put' ], function(name) {
		authHttp[name] = function(url, data, config) {
			config = config || {};
			extendHeaders(config);
			return $http[name](url, data, config);
		};
	});
	return authHttp;
});

// Register the countryService...
replacemeModule.factory('todoService', [ '$resource', '$routeParams',
		function($resource, $routeParams) {
			return replaceme.services.ToDoService($resource, $routeParams);
		} ]);


replaceme.services.ToDoService = function ($resource, $routeParams) {

    var REST_CREATE_URL = replaceme.REST_BASE_URL + 'secured/ToDo/create';
    var REST_READ_URL = replaceme.REST_BASE_URL + 'secured/ToDo/read/:id';
    var REST_LIST_URL = replaceme.REST_BASE_URL + 'secured/ToDo/all';
    var REST_UPDATE_URL = replaceme.REST_BASE_URL + 'secured/ToDo/update';

    var create,
        read,
        update,
        remove,
        list,
        currentTodo,
        mapJsonArrayToToDoItem
        ;

    create = function (todo, callback) {
        //console.log("ToDoService.create");
        var ToDoProxy = $resource(REST_CREATE_URL);
        var proxy = new ToDoProxy();
        proxy.subject = todo.subject;
        proxy.whatToDo = todo.whatToDo;

        proxy.$save(todo, function (data) {
            var todo = new replaceme.model.ToDo(data);
            currentTodo = todo;
            callback(todo);
        });
    };

    read = function (id, callback) {
        //console.log("ToDoService.read");

        //If we already have the country loaded, just put it in the callback and return
        if (currentTodo && currentTodo.id === id) {
            callback(currentTodo);
            return;
        }

        var todoProxy = $resource(REST_READ_URL);
        var loadedTodo = countryProxy.get({id: $routeParams.id}, function (data) {
            var todo = new replaceme.model.ToDo(data);
            currentTodo = todo;
            callback(todo);
        });
    };

    list = function (callback) {
        //console.log("ToDoService.list");
        var todos = $resource(REST_LIST_URL);
        todos.query(function (data) {
            var todosArray = mapJsonArrayToToDoItem(data);
            callback(todosArray);
        });
    };

    update = function (todo, callback) {
        var ToDoUpdateProxy = $resource(REST_UPDATE_URL);
        var proxy = new ToDoUpdateProxy();
        proxy.id = todo.id;
        proxy.subject = todo.subject;
        proxy.whatToDo = todo.whatToDo;
        proxy.$save(function (data) {
            var todo = new replaceme.model.ToDo(data);
            currentTodo = todo;
            callback(todo);
        });
    };

    mapJsonArrayToToDoItem = function (jsonData) {
        var todosArray = [];
        angular.forEach(jsonData, function (todoElement) {
            var todo = new replaceme.model.ToDo(todoElement);
            todosArray.push(todo);
        });
        return todosArray;
    };

    return {
        create: create,
        read: read,
        update: update,
        remove: remove,
        list: list,
        currentTodo: currentTodo,
        mapJsonArrayToToDoItem: mapJsonArrayToToDoItem
    };

};
