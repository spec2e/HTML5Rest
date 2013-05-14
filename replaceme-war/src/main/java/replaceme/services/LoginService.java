package replaceme.services;

import filters.AuthenticateFilter;
import replaceme.SessionContext;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.NewCookie;
import javax.ws.rs.core.Response;

@Path("/Login")
public class LoginService {

    @Inject
    private SessionContext sessionContext;

    @Path("/login/{user}/{pass}")
    @POST
    public Response login(@PathParam(value = "user") String user, @PathParam(value = "pass") String pass) {

        sessionContext.setAuthToken("1234");

        return Response.status(200).header("Authentication", "1234").
                build();
    }

    @Path("/logout")
    @POST
    public Response logout() {
        sessionContext.setAuthToken(null);
        return Response.status(200).build();
    }

}
