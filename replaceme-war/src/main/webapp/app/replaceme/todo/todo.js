/*jslint browser : true, continue : true,
         devel : true, indent : 2, maxerr : 50,
         newcap : true, nomen : true, plusplus : true,
         regexp : true, sloppy : true, vars : false,
         white : false
*/
/*global namespace, replaceme*/

namespace('replaceme.todo');

replaceme.todo.CreateController = function ($scope, $routeParams, $resource, todoService, alertService, $location) {

    $scope.todo = new replaceme.model.ToDo();

    $scope.create = function () {
        var todoToCreate = $scope.todo;
        todoService.create(todoToCreate, function (todoToCreate) {
            alertService.setSuccessMessage("ToDo was created");
            $location.path('/todo/list');
        });
    };
};

replaceme.todo.ListController = function ($scope, $routeParams, $resource, todoService) {

    //Declare the query model field - just for clarity...
    $scope.query = '';

    $scope.datepickerOptions = {
        changeYear: true,
        changeMonth: true,
        yearRange: '1900:-0',
        dateFormat: 'dd-mm-yy'
    };

    $scope.myDate = undefined;

};

replaceme.todo.Tab1Controller = function ($scope, $routeParams, $resource, todoService, alertService) {

    $scope.toggleEditSubject = function (index, $event) {

        if ($scope.selectedIndex === index) {
            todoService.update($scope.todoList[index], function (todo) {
                console.log("updating...");
                alertService.setSuccessMessage("ToDo was updated :-)");
            });

            //Reset the selectedIndex variable
            $scope.selectedIndex = -1;

        } else {
            $scope.selectedIndex = index;
        }
    };
    $scope.isSubjectEditing = function (index) {
        return $scope.selectedIndex === index;
    };

    $scope.todoList = [];

    todoService.list(function (list) {
        $scope.todoList = list;
    });
};

replaceme.todo.Tab2Controller = function ($scope, $routeParams, $resource, todoService) {
    $scope.message = 'Tab 2 message';
};