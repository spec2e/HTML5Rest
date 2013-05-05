package replaceme.services;

import org.junit.Test;

public class ToDoItemServiceTest {

    @Test
    public void testCreate() throws Exception {

        ToDoItemService service = new ToDoItemService();
        service.create(null);

    }

}
