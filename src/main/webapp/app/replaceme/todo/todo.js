namespace('replaceme.todo');

replaceme.todo.CreateController = function($scope, $routeParams, $resource, todoService) {

    $scope.todo = new replaceme.model.ToDo();

    $scope.create = function () {
        var todoToCreate = $scope.todo;
        todoService.create(todoToCreate, function (todoToCreate) {
            $scope.addSuccessMessage("ToDo was created");
            $scope.go('/home');
        });
    }
};

replaceme.todo.ListController = function($scope, $routeParams, $resource, todoService) {

    $scope.todoList = [];

    todoService.list(function(data) {
        angu
    });
};