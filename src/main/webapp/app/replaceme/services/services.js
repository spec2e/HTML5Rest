namespace('replaceme.services');

replaceme.services.ToDoService = function ($resource, $routeParams) {

    var REST_CREATE_URL = replaceme.REST_BASE_URL + 'ToDo/create';
    var REST_READ_URL = replaceme.REST_BASE_URL + 'ToDo/read/:id'
    var REST_LIST_URL = replaceme.REST_BASE_URL + 'ToDo/list';
    var REST_UPDATE_URL = replaceme.REST_BASE_URL + 'ToDo/update';

    var create,
        read,
        update,
        remove,
        list,
        currentTodo;

    create = function (todo, callback) {
        console.log("ToDoService.create");
        var ToDoProxy = $resource(REST_CREATE_URL);
        var proxy = new ToDoProxy();
        proxy.subject = todo.country;
        proxy.whatToDo = todo.areas;

        proxy.$save(todo, function(data) {
            var todo = new replaceme.model.ToDo(data);
            currentTodo = todo;
            callback(todo);
        });
    };

    read = function(id, callback) {
        console.log("ToDoService.read");

        //If we already have the country loaded, just put it in the callback and return
        if(currentTodo && currentTodo.id === id) {
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

    list = function(callback) {
        console.log("ToDoService.list");
        var todos = $resource(REST_LIST_URL);
        var todoList = todos.query(function (data) {
            var todosArray = [];
            angular.forEach(todoList, function (country) {
                todosArray.push(country);
            });
            callback(todoList);
        });
    };

    update = function(todo, callback) {
        var ToDoUpdateProxy = $resource(REST_UPDATE_URL);
        var proxy = new ToDoUpdateProxy();
        proxy.id = todo.id;
        proxy.subject = todo.country;
        proxy.whatToDo = todo.areas;
        proxy.$save(function (data) {
            var todo = new replaceme.model.Country(data);
            currentTodo = todo;
            callback(todo)
        });
    };

    return {
        create: create,
        read: read,
        update: update,
        remove: remove,
        list: list,
        currentTodo: currentTodo
    };

};
