package zetta.fitnesstrackerbackend.config;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;

import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * DO NOT USE UNLESS NECESSARY
 * @author thedco5
 * @since 08.07.2024
 */
@Deprecated
public class CustomJwtGrantedAuthoritiesConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

    private final JwtGrantedAuthoritiesConverter defaultConverter = new JwtGrantedAuthoritiesConverter();

    @Override
    @SuppressWarnings("unchecked")
    public Collection<GrantedAuthority> convert(Jwt jwt) {
        Collection<GrantedAuthority> authorities = defaultConverter.convert(jwt);
        try {
            Map<String, Object> resourceAccess = jwt.getClaim("resource_access");
            Map<String, Object> clientAccess = (Map<String, Object>) resourceAccess.get("zettafit-restapi");
            List<String> clientRoles = (List<String>) clientAccess.get("roles");
            authorities.addAll(clientRoles.stream().map(role -> new SimpleGrantedAuthority("ROLE_" + role)).toList());
        } catch (NullPointerException ignored) { }
        return authorities;
    }

}