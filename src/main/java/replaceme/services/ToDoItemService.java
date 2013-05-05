package replaceme.services;

import org.jboss.resteasy.spi.validation.ValidateRequest;
import replaceme.model.ToDoItem;

import javax.validation.Valid;

import javax.validation.constraints.NotNull;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/ToDoItem")
public class ToDoItemService extends CRUDService<ToDoItem> {

    @Override
    @Path("/create")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @ValidateRequest
    public ToDoItem create(@Valid ToDoItem resource) {
        System.out.println("ToDoItemService.create");
        resource.setId("1");
        return resource;
    }

    @Override
    @Path("read")
    @GET
    @ValidateRequest
    public ToDoItem read(@NotNull String id) {
        return null;
    }

    @Override
    @Path("/update")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @ValidateRequest
    public ToDoItem update(@Valid ToDoItem resource) {
        return null;
    }

    @Override
    @Path("delete")
    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    @ValidateRequest
    public void delete(@Valid ToDoItem resource) {

    }

    @Override
    @Path("/all")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<ToDoItem> all() {
        return null;
    }

    @Path("share")
    @POST
    @ValidateRequest
    public void share(@NotNull String email) {

    }

}
