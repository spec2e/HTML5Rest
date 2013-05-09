package replaceme.model;

import java.util.*;

public class ToDoItemDummyListFactory {

    public static Map<String, ToDoItem> createToDosDummyMap() {

        List<ToDoItem> todos = createDummyToDoList();

        Map<String, ToDoItem> todoMap = new HashMap<String, ToDoItem>();

        for (ToDoItem todo : todos) {
            todoMap.put(todo.getId(), todo);
        }

        return todoMap;
    }

    public static List<ToDoItem> createDummyToDoList() {

        ToDoItem testItem = new ToDoItem();
        testItem.setId("1");
        testItem.setSubject("Fritid hjemme");
        testItem.setWhatToDo("Se fjernsyn");

        ToDoItem testItem2 = new ToDoItem();
        testItem2.setId("2");
        testItem2.setSubject("Pligt hjemme");
        testItem2.setWhatToDo("Lave mad");

        ToDoItem testItem3 = new ToDoItem();
        testItem3.setId("3");
        testItem3.setSubject("Pligt hjemme");
        testItem3.setWhatToDo("Bage boller");

        ToDoItem testItem4 = new ToDoItem();
        testItem4.setId("4");
        testItem4.setSubject("Skole");
        testItem4.setWhatToDo("Huske at lave lektier");

        ToDoItem testItem5 = new ToDoItem();
        testItem5.setId("5");
        testItem5.setSubject("Motion");
        testItem5.setWhatToDo("Cykeltur");

        ToDoItem testItem6 = new ToDoItem();
        testItem6.setId("6");
        testItem6.setSubject("Arbejde");
        testItem6.setWhatToDo("Huske møder");

        ToDoItem testItem7 = new ToDoItem();
        testItem7.setId("7");
        testItem7.setSubject("Familie");
        testItem7.setWhatToDo("Hente børn i SFO");

        ToDoItem testItem8 = new ToDoItem();
        testItem8.setId("8");
        testItem8.setSubject("Huset");
        testItem8.setWhatToDo("Ordne haven");

        ToDoItem testItem9 = new ToDoItem();
        testItem9.setId("9");
        testItem9.setSubject("Huset");
        testItem9.setWhatToDo("Male huset");

        List<ToDoItem> todos = new ArrayList<ToDoItem>();
        todos.add(testItem);
        todos.add(testItem2);
        todos.add(testItem3);
        todos.add(testItem4);
        todos.add(testItem5);
        todos.add(testItem6);
        todos.add(testItem7);
        todos.add(testItem8);
        todos.add(testItem9);

        return todos;
    }
}
