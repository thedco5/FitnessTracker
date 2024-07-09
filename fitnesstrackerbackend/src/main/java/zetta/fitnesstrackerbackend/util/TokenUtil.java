package zetta.fitnesstrackerbackend.util;

import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public class TokenUtil {

    public static UUID getID(JwtAuthenticationToken token) {
        return UUID.fromString((String) token.getTokenAttributes().get("sub"));
    }

    @SuppressWarnings("unchecked")
    public static String getRole(JwtAuthenticationToken token) {
        try {
            Map<String, Object> resourceAccess = (Map<String, Object>) token.getTokenAttributes().get("resource_access");
            Map<String, Object> realmResourceAccess = (Map<String, Object>) resourceAccess.get("zettafit-restapi");
            List<String> roles = (List<String>) realmResourceAccess.get("roles");
            return roles.get(0);
        } catch (NullPointerException e) {
            return "user";
        }
    }

}