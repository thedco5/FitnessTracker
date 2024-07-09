package zetta.fitnesstrackerbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import zetta.fitnesstrackerbackend.dto.user.UserDTO;
import zetta.fitnesstrackerbackend.service.UserService;

import java.util.UUID;

@EnableWebMvc
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/info")
    public UserDTO getData(JwtAuthenticationToken authentication){
        return userService.getUserInfo(UUID.fromString(
                (String) authentication.getTokenAttributes().get("sub"))
        );
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("[TEST] user_controller");
    }

}