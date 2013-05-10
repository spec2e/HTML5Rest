package replaceme.model;

import javax.validation.constraints.NotNull;

public class ToDoItem extends Resource {

    @NotNull
    private String subject;

    @NotNull
    private String whatToDo;

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getWhatToDo() {
        return whatToDo;
    }

    public void setWhatToDo(String whatToDo) {
        this.whatToDo = whatToDo;
    }
}
