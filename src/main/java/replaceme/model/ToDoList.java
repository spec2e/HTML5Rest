package replaceme.model;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

public class ToDoList extends Resource {

    @Valid
    private List<ToDoItem> toDoItems = new ArrayList<ToDoItem>();

    @NotNull
    private String name;
    @NotNull
    private String description;

    public List<ToDoItem> getToDoItems() {
        return toDoItems;
    }

    public void setToDoItems(List<ToDoItem> toDoItems) {
        this.toDoItems = toDoItems;
    }

    public void addToDoItem(ToDoItem toDoItem) {
        if(toDoItem == null) {
            throw new IllegalArgumentException("toDoItem can not be null!");
        }
        toDoItems.add(toDoItem);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
