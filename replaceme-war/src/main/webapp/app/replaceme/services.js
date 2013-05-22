/*jslint browser : true, continue : true,
         devel : true, indent : 2, maxerr : 50,
         newcap : true, nomen : true, plusplus : true,
         regexp : true, sloppy : true, vars : false,
         white : false
*/
/*global namespace, replaceme, replacemeModule, angular*/

namespace('replaceme.services');

replacemeModule.factory('alertService', function ($timeout) {

    var errorMessage,
        setErrorMessage,
        successMessage,
        setSuccessMessage,
        //'that' will be initialized to the object, which is returned by this function
        that,
        setTimeOut;

    setTimeOut = function () {
        $timeout(function () {
            that.errorMessage = null;
            that.successMessage = null;
        }, 3000, true);
    };

    setErrorMessage = function (msg) {
        setTimeOut();
        errorMessage = msg;
    };

    setSuccessMessage = function (msg) {
        setTimeOut();
        successMessage = msg;
    };

    that = {
        errorMessage: errorMessage,
        setErrorMessage: setErrorMessage,
        successMessage: successMessage,
        setSuccessMessage: setSuccessMessage
    };

    return that;

});

replacemeModule.factory('errorHttpInterceptor', function ($q, $location, alertService, $rootScope, $cookieStore) {
    return function (promise) {
        return promise.then(
            //Success...
            function (response) {

                if (response.headers(replaceme.AUTHENTICATION_COOKIE)) {
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
                    alertService.setErrorMessage("Could not find the service you were looking for!");
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

    var REST_CREATE_URL = replaceme.REST_BASE_URL + 'secured/ToDo/create',
        REST_READ_URL = replaceme.REST_BASE_URL + 'secured/ToDo/read/:id',
        REST_LIST_URL = replaceme.REST_BASE_URL + 'secured/ToDo/all',
        REST_UPDATE_URL = replaceme.REST_BASE_URL + 'secured/ToDo/update',
        create,
        read,
        update,
        remove,
        list,
        currentTodo,
        mapJsonArrayToToDoItem
        ;

    create = function (todo, callback) {
        //console.log("ToDoService.create");
        var ToDoProxy,
            proxy
            ;
        
        ToDoProxy = $resource(REST_CREATE_URL);
        proxy = new ToDoProxy();
        
        proxy.subject = todo.subject;
        proxy.whatToDo = todo.whatToDo;

        proxy.$save(todo, function (data) {
            var todo = new replaceme.model.ToDo(data);
            currentTodo = todo;
            callback(todo);
        });
    };

    read = function (id, callback) {
        
        var todoProxy,
            loadedTodo
            ;
        
        todoProxy = $resource(REST_READ_URL);
        
        //If we already have the country loaded, just put it in the callback and return
        if (currentTodo && currentTodo.id === id) {
            callback(currentTodo);
            return;
        }        
        
        loadedTodo = todoProxy.get({id: $routeParams.id}, function (data) {
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
        
        var ToDoUpdateProxy,
            proxy
            ;
        
        ToDoUpdateProxy = $resource(REST_UPDATE_URL);
        proxy = new ToDoUpdateProxy();
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
