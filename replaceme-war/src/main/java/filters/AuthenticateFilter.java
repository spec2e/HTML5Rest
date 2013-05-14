package filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebFilter("/rest/secured/*")
public class AuthenticateFilter implements Filter {

    private static final String AUTHENTICATION = "Authentication";

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
		    String authToken = cookie.getValue();
		    System.out.println("cookieName: " + cookie.getName() + ", cookieValue: " + authToken);
		    if (authTokenIsValid(authToken)) {
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

    private boolean authTokenIsValid(String authenticationToken) {
	return true;
    }

    @Override
    public void init(FilterConfig config) throws ServletException {
    }

}
