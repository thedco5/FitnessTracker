package zetta.fitnesstrackerbackend.controller;

import org.keycloak.representations.AccessTokenResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import zetta.fitnesstrackerbackend.dto.user.LoginDTO;
import zetta.fitnesstrackerbackend.dto.user.UserDTO;
import zetta.fitnesstrackerbackend.service.KeycloakAdminService;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    private static final Logger logger = LoggerFactory.getLogger(PublicController.class);

    @Autowired
    private KeycloakAdminService keycloakAdminService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody @Validated UserDTO userDTO) {
        return keycloakAdminService.signup(userDTO);
    }

    @PostMapping("/login")
    public AccessTokenResponse loginUser(@RequestBody LoginDTO loginDTO) {
        return keycloakAdminService.loginUser(loginDTO);
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("[TEST] public_controller");
    }

}