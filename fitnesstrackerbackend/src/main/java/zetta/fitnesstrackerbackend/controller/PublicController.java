package zetta.fitnesstrackerbackend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
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
        keycloakAdminService.createUser(userDTO.getUsername(), userDTO.getEmail(), userDTO.getPassword());
        logger.info("New user created");
        return ResponseEntity.ok("Successfully signed up user");
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("[TEST] public_controller");
    }

}