namespace('replaceme.services');

replacemeModule.factory('alertService', function () {

    var errorMessage, 
        setError, 
        clearError,
        successMessage,
        setSuccess,
        clearSuccess;

    setError = function (msg) {        
        this.errorMessage = msg;
    };

    clearError = function () {
        this.errorMessage = null;
    };
    
    setSuccess = function(msg) {
    	this.successMessage = msg;
    };
    
    clearSuccess = function() {
    	this.successMessage = null;
    };

    return {
        errorMessage: errorMessage,
        setError: setError,
        clearError: clearError,
        successMessage: successMessage,
        setSuccess: setSuccess,
        clearSuccess: clearSuccess
    };

});

replacemeModule.factory('errorHttpInterceptor', function ($q, $location, alertService, $rootScope, $cookieStore) {
    return function (promise) {
        return promise.then(
            //Success...
            function (response) {

                if(response.headers(replaceme.AUTHENTICATION_COOKIE)) {
                    var authToken = response.headers(replaceme.AUTHENTICATION_COOKIE);
                    $cookieStore.put(replaceme.AUTHENTICATION_COOKIE, authToken);
                }

                return response;
            },
            //Error...
            function (response) {
                if (response.status === 401) {
                    $rootScope.$broadcast('event:loginRequired');
                } else if (response.status >= 400 && response.status < 500) {
                	alertService.setError("Could not find the service you were looking for!");
                }
                return $q.reject(response);
            });
    };
});


// Register the todoService...
replacemeModule.factory('todoService', [ '$resource', '$routeParams',
    function ($resource, $routeParams) {
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
