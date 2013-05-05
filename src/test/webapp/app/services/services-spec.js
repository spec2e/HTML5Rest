
describe('ToDoService tests',function(){

    var toDoJsonData = [];

    //Create an easily-removed container for our tests to play in
    beforeEach(function() {
        console.log("beforeEach");
    });

    //Clean it up after each spec
    afterEach(function() {
        console.log("afterEach");
    });

    //Specs
    describe('Tests mapping of ToDo from JSON to Array',function() {
        it('maps a returned JSON array to an array of replaceme.todo.ToDo objects',function(){
            var locator = undefined;
            var routeParams = undefined;
            var toDoService = replaceme.services.ToDoService(locator, routeParams);
            console.log("toDoService instantiated");
            var todoArray = toDoService.mapJsonToToDoItem(toDoJsonData);
            console.log("todoArray: " + todoArray);
            expect(todoArray.length).toBe(8);
        });
    });

    describe('second example',function() {

        beforeEach(function(){
            console.log("second.example.beforeEach");
        });

        it('shows how to provide another test method',function(){
            console.log("second.example.it")
        });

    });

});