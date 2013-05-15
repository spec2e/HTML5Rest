package replaceme;

import javax.enterprise.context.SessionScoped;
import java.io.Serializable;

@SessionScoped
public class SessionContext implements Serializable {

    private String authToken;

    public String getAuthToken() {
        return authToken;
    }

    public void setAuthToken(String token) {
        authToken = token;
    }
}
