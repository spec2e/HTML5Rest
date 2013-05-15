describe('ToDoService tests', function () {

    var toDoJsonData = [
        {"subject": "Fritid hjemme", "whatToDo": "Se fjernsyn", "id": "1"},
        {"subject": "Pligt hjemme", "whatToDo": "Lave mad", "id": "2"},
        {"subject": "Pligt hjemme", "whatToDo": "Bage boller", "id": "3"},
        {"subject": "Skole", "whatToDo": "Huske at lave lektier", "id": "4"},
        {"subject": "Motion", "whatToDo": "Cykeltur", "id": "5"},
        {"subject": "Arbejde", "whatToDo": "Huske møder", "id": "6"},
        {"subject": "Familie", "whatToDo": "Hente børn i SFO", "id": "7"},
        {"subject": "Huset", "whatToDo": "Ordne haven", "id": "8"},
        {"subject": "Huset", "whatToDo": "Male huset", "id": "9"}
    ];

    //Create an easily-removed container for our tests to play in
    beforeEach(function () {
        //console.log("beforeEach");
    });

    //Clean it up after each spec
    afterEach(function () {
        //console.log("afterEach");
    });

    //Specs
    describe('Test mapping of ToDo from JSON to Array', function () {
        it('should map a JSON array to an array of replaceme.model.ToDo objects', function () {
            var locator = undefined;
            var routeParams = undefined;
            var toDoService = replaceme.services.ToDoService(locator, routeParams);
            log("toDoService instantiated");
            var todoArray = toDoService.mapJsonArrayToToDoItem(toDoJsonData);
            log("todoArray: " + todoArray);
            expect(todoArray.length).toBe(9);
        });
    });

    describe('Test JSON mapping to replaceme.model.ToDo', function () {

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