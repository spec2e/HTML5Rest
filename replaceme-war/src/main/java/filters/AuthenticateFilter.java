package filters;

import replaceme.SessionContext;

import javax.inject.Inject;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.net.URLDecoder;


@WebFilter("/rest/secured/*")
public class AuthenticateFilter implements Filter {

    public static final String AUTHENTICATION = "Authentication";

    @Inject
    SessionContext sessionContext;

    @Override
    public void destroy() {
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws IOException, ServletException {

        HttpServletRequest httpReq = (HttpServletRequest) req;

        boolean isAuthenticated = false;

        Cookie[] cookies = httpReq.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                String cookieName = cookie.getName();
                if (cookieName.equals(AUTHENTICATION)) {
                    String authToken = URLDecoder.decode(cookie.getValue(), "UTF-8");
                    String cleanedAuthToken = authToken.substring(1, authToken.length() -1);
                    String sessionAuthToken = sessionContext.getAuthToken();
                    if (authTokenIsValid(cleanedAuthToken, sessionAuthToken)) {
                        isAuthenticated = true;
                        chain.doFilter(req, resp);
                    }
                }
            }
        }

        if (!isAuthenticated) {
            HttpServletResponse httpResp = (HttpServletResponse) resp;
            httpResp.setStatus(401);
        }
    }

    private boolean authTokenIsValid(String authenticationToken, String sessionAuthToken) {

        return authenticationToken.equals(sessionAuthToken);

    }

    @Override
    public void init(FilterConfig config) throws ServletException {
    }

}
