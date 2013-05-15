package replaceme.services;

import java.net.URLEncoder;
import java.util.UUID;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

import filters.AuthenticateFilter;

import replaceme.SessionContext;

@Path("/Login")
public class LoginService {

    @Inject
    private SessionContext sessionContext;

    @Path("/login/{user}/{pass}")
    @POST
    public Response login(@PathParam(value = "user") String user, @PathParam(value = "pass") String pass) throws Exception {

	//TODO: Find an algorithm to deliver security tokens. Tmporary solution is UUID.
	UUID uuiId = UUID.randomUUID();
	String token = uuiId.toString();
	String encodedToken = URLEncoder.encode(token, "UTF-8");
        sessionContext.setAuthToken(encodedToken);
        return Response.status(200).
        	header(AuthenticateFilter.AUTHENTICATION, encodedToken).
                build();
    }

    @Path("/logout")
    @POST
    public Response logout() {
        sessionContext.setAuthToken(null);
        return Response.status(200).build();
    }

}
