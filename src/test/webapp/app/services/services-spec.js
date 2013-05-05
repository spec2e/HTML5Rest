describe('ToDoService tests', function () {

    var toDoJsonData = [];

    //Create an easily-removed container for our tests to play in
    beforeEach(function () {
        //console.log("beforeEach");
    });

    //Clean it up after each spec
    afterEach(function () {
        //console.log("afterEach");
    });

    //Specs
    describe('Tests mapping of ToDo from JSON to Array', function () {
        it('maps a returned JSON array to an array of replaceme.todo.ToDo objects', function () {
            var locator = undefined;
            var routeParams = undefined;
            var toDoService = replaceme.services.ToDoService(locator, routeParams);
            //console.log("toDoService instantiated");
            var todoArray = toDoService.mapJsonArrayToToDoItem(toDoJsonData);
            //console.log("todoArray: " + todoArray);
            expect(todoArray.length).toBe(0);
        });
    });

    describe('Test JSON to ToDo', function () {

        beforeEach(function () {
            //console.log("second.example.beforeEach");
        });

        it('should map a JSON structure to a ToDo item', function () {
            var json = '{"subject":"subject_test", "whatToDo":"whatToDo_test"}';
            var struct = JSON.parse(json);
            var todo = replaceme.model.ToDo(struct);

            expect(todo.subject).toBe('subject_test');
            expect(todo.whatToDo).toBe('whatToDo_test');

        });

    });

});