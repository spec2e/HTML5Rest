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

replaceme.todo.ListController = function($scope, $routeParams, $resource, todoService) {

    //Declare the query model field - just for clarity...
    $scope.query = '';

    $scope.date = '';

};

replaceme.todo.Tab1Controller = function($scope, $routeParams, $resource, todoService) {

    $scope.toggleEditSubject = function(index, $event) {
        //var element = angular.element($event.target);
        //log("id: " + element.attr('id'));
        if($scope.selectedIndex === index) {
            //Reset the selectedIndex variable
            $scope.selectedIndex = -1;
        } else {
            $scope.selectedIndex = index;
        }
    };
    $scope.isSubjectEditing = function(index) {
        return $scope.selectedIndex === index;
    };

    $scope.todoList = [];

    todoService.list(function(list) {
        $scope.todoList = list;
    });
};

replaceme.todo.Tab2Controller = function($scope, $routeParams, $resource, todoService) {
    $scope.message = 'Tab 2 message';
};