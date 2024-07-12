package zetta.fitnesstrackerbackend.service;

import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.UsersResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import zetta.fitnesstrackerbackend.dto.user.LoginDTO;
import zetta.fitnesstrackerbackend.dto.user.RefreshTokenDTO;
import zetta.fitnesstrackerbackend.dto.user.UserDTO;

import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.client.Entity;
import jakarta.ws.rs.core.Form;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class KeycloakAdminService {

    @Value("${keycloak.url}")
    private String KEYCLOAK_URL;

    @Value("${keycloak.realm}")
    private String KEYCLOAK_REALM;

    @Value("${keycloak.clientid}")
    private String KEYCLOAK_CLIENTID;

    private static final Logger logger = LoggerFactory.getLogger(KeycloakAdminService.class);

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private Keycloak keycloak;

    @Autowired
    public KeycloakAdminService(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
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

        try (Response response = keycloak.realm(KEYCLOAK_REALM).users().create(user)) {

            if (201 == response.getStatus()) {
                logger.info("Keycloak - User created successfully");
                UsersResource usersResource = keycloak.realm(KEYCLOAK_REALM).users();
                List<UserRepresentation> userList = usersResource.search(userDTO.getUsername());
                if (1 == userList.size()) {
                    userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
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
                .serverUrl(KEYCLOAK_URL)
                .realm(KEYCLOAK_REALM)
                .clientId(KEYCLOAK_CLIENTID)
                .username(loginDTO.getUsername())
                .password(loginDTO.getPassword())
                .grantType(OAuth2Constants.PASSWORD)
                .build()) {
            logger.info("Keycloak - Logging in user");
            return keycloakLogin.tokenManager().getAccessToken();
        }
    }

    public AccessTokenResponse refreshToken(RefreshTokenDTO refreshTokenDTO) {
        try (Client client = ClientBuilder.newClient()) {

            Form form = new Form();
            form.param("grant_type", OAuth2Constants.REFRESH_TOKEN);
            form.param("client_id", KEYCLOAK_CLIENTID);
            form.param("refresh_token", refreshTokenDTO.getToken());

            try (Response response = client
                    .target(KEYCLOAK_URL + "/realms/" + KEYCLOAK_REALM + "/protocol/openid-connect/token")
                    .request(MediaType.APPLICATION_FORM_URLENCODED_TYPE)
                    .post(Entity.form(form))) {
                if (response.getStatus() != 200) {
                    logger.warn("Keycloak - Failed to refresh token");
                    throw new RuntimeException("Failed to refresh token!");
                }
                return response.readEntity(AccessTokenResponse.class);
            }

        }
    }

    public ResponseEntity<String> logoutUser(RefreshTokenDTO token) {
        try (Client client = ClientBuilder.newClient()) {
            Form form = new Form();
            form.param("client_id", KEYCLOAK_CLIENTID);
            form.param("refresh_token", token.getToken());
            try (Response response = client
                    .target(KEYCLOAK_URL + "/realms/" + KEYCLOAK_REALM + "/protocol/openid-connect/logout")
                    .request(MediaType.APPLICATION_FORM_URLENCODED_TYPE)
                    .post(Entity.form(form))) {
                if (response.getStatus() != 204) {
                    logger.warn("Keycloak - Failed to logout user");
                    return ResponseEntity
                            .status(response.getStatus())
                            .body("Logout failed!");
                }
                return ResponseEntity.ok("Successfully logged out user");
            }
        }
    }

}