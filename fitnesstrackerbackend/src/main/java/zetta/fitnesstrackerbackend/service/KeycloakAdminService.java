package zetta.fitnesstrackerbackend.service;

import jakarta.ws.rs.core.Response;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.UsersResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import zetta.fitnesstrackerbackend.controller.PublicController;
import zetta.fitnesstrackerbackend.dto.user.LoginDTO;
import zetta.fitnesstrackerbackend.dto.user.UserDTO;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class KeycloakAdminService {

    private static final Logger logger = LoggerFactory.getLogger(KeycloakAdminService.class);

    private final UserService userService;

    @Autowired
    private Keycloak keycloak;

    @Autowired
    public KeycloakAdminService(UserService userService) {
        this.userService = userService;
    }

    public ResponseEntity<String> signup(UserDTO userDTO) {
        var response = createUser(userDTO);
        return response.getStatusCode().isError() ?
                ResponseEntity
                        .status(response.getStatusCode())
                        .body("Keycloak register error") :
                ResponseEntity
                        .ok("Successfully signed up user");
    }

    public ResponseEntity<String> createUser(UserDTO userDTO) {

        CredentialRepresentation credential = new CredentialRepresentation();
        credential.setType(CredentialRepresentation.PASSWORD);
        credential.setValue(userDTO.getPassword()); // HASH UNNECESSARY
        credential.setTemporary(false);

        UserRepresentation user = new UserRepresentation();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setEnabled(true);
        user.setCredentials(Collections.singletonList(credential));

        try (Response response = keycloak.realm("zettafit").users().create(user)) {

            if (201 == response.getStatus()) {
                logger.info("Keycloak - User created successfully");
                UsersResource usersResource = keycloak.realm("zettafit").users();
                List<UserRepresentation> userList = usersResource.search(userDTO.getUsername());
                if (1 == userList.size()) {
                    userDTO.setId(UUID.fromString(userList.get(0).getId()));
                    return userService.createUser(userDTO);
                } else {
                    logger.warn("Keycloak - Multiple or no users found with username: {}", userDTO.getUsername());
                    return ResponseEntity
                            .badRequest()
                            .body("User failed to be created");
                }
            } else {
                logger.warn("Keycloak - Failed to create user: {}", response.getStatusInfo().getReasonPhrase());
                return ResponseEntity
                        .badRequest()
                        .body("User failed to be created");
            }
        }

    }

    public AccessTokenResponse loginUser(LoginDTO loginDTO) {
        try (Keycloak keycloakLogin = KeycloakBuilder.builder()
                .serverUrl("http://localhost:8888")
                .realm("zettafit")
                .clientId("zettafit-restapi")
                .username(loginDTO.getUsername())
                .password(loginDTO.getPassword())
                .grantType(OAuth2Constants.PASSWORD)
                .build()) {
            logger.info("Keycloak - Logging in user");
            return keycloakLogin.tokenManager().getAccessToken();
        }
    }

}