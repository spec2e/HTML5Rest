package replaceme.services;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.jboss.resteasy.core.Dispatcher;
import org.jboss.resteasy.mock.MockDispatcherFactory;
import org.jboss.resteasy.mock.MockHttpRequest;
import org.jboss.resteasy.mock.MockHttpResponse;
import org.jboss.resteasy.plugins.server.resourcefactory.POJOResourceFactory;
import org.junit.Assert;
import org.junit.Test;
import replaceme.model.ToDoItem;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.MediaType;

public class ToDoItemServiceTest {

    @Test
    public void testCreate() throws Exception {

        Dispatcher dispatcher = MockDispatcherFactory.createDispatcher();

        POJOResourceFactory noDefaults = new POJOResourceFactory(ToDoItemService.class);
        dispatcher.getRegistry().addResourceFactory(noDefaults);


        {
            MockHttpRequest request = MockHttpRequest.post("ToDo/create");
            request.contentType(MediaType.APPLICATION_JSON_TYPE);

            ToDoItem testItem = new ToDoItem();
            testItem.setSubject("subject");
            testItem.setWhatToDo("whatToDo");

            Gson gson = new Gson();
            String content = gson.toJson(testItem);
            request.content(content.getBytes());

            MockHttpResponse response = new MockHttpResponse();

            dispatcher.invoke(request, response);

            Assert.assertEquals(HttpServletResponse.SC_OK, response.getStatus());

            ToDoItem toDoItem = gson.fromJson(response.getContentAsString(), ToDoItem.class);

            Assert.assertEquals("1", toDoItem.getId());
            Assert.assertEquals("subject", toDoItem.getSubject());
            Assert.assertEquals("whatToDo", toDoItem.getWhatToDo());

        }

    }

}
