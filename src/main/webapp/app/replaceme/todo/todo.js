namespace('replaceme.todo');

replaceme.todo.CreateController = function($scope, $routeParams, $resource, todoService) {

    $scope.todo = new replaceme.model.ToDo();

    $scope.create = function () {
        var todoToCreate = $scope.todo;
        todoService.create(todoToCreate, function (todoToCreate) {
            $scope.addSuccessMessage("ToDo was created");
            $scope.go('/todo/list');
        });
    }
};

replaceme.todo.Tab1Controller = function($scope, $routeParams, $resource, todoService) {

    $scope.message = 'Tab 1 message';
    $scope.editSubject = function(index) {
        $scope.selectedIndex = index;
        $('#subject' + index).focus();
    };

    $scope.todoList = [];

    todoService.list(function(list) {
        $scope.todoList = list;
    });
};

replaceme.todo.Tab2Controller = function($scope, $routeParams, $resource, todoService) {
    $scope.message = 'Tab 2 message';
};