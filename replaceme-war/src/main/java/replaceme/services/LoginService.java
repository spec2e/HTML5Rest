package replaceme.services;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.NewCookie;
import javax.ws.rs.core.Response;

@Path("/Login")
public class LoginService {

    @Path("/login/{user}/{pass}")
    @POST
    public Response login(@PathParam(value = "user") String user, @PathParam(value = "pass") String pass) {

        //NewCookie authCookie = new NewCookie("Authentication", "1234", "/replaceme/secure", "mydomain.dk", "auth cookie", 3600, false);

        return Response.status(200).header("Authentication", "1234").
                build();
    }

}
