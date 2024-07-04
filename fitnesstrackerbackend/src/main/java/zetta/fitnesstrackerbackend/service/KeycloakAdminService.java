package zetta.fitnesstrackerbackend.service;

import jakarta.ws.rs.core.Response;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;

import java.util.Collections;

@Service
public class KeycloakAdminService {

    @Autowired
    private Keycloak keycloak;

    public String createUser(String username, String email, String password) {
        UserRepresentation user = new UserRepresentation();
        user.setUsername(username);
        user.setEmail(email);
        user.setEnabled(true);

        CredentialRepresentation credential = new CredentialRepresentation();
        credential.setType(CredentialRepresentation.PASSWORD);
        credential.setValue(password);
        credential.setTemporary(false);
        user.setCredentials(Collections.singletonList(credential));

        Response response = keycloak.realm("zettafit").users().create(user);

        if (201 == response.getStatus()) {
            return "User created successfully";
        } else {
            return "Failed to create user: " + response.getStatusInfo().getReasonPhrase();
        }

    }

    public AccessTokenResponse loginUser(String username, String password) {
        Keycloak keycloakLogin = KeycloakBuilder.builder()
                .serverUrl("http://localhost:8888/auth")
                .realm("zettafit")
                .clientId("your-client-id")
                .grantType(OAuth2Constants.PASSWORD)
                .username(username)
                .password(password)
                .build();
        return keycloakLogin.tokenManager().getAccessToken();
    }

}