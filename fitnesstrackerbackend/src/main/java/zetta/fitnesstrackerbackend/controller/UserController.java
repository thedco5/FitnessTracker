package zetta.fitnesstrackerbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import zetta.fitnesstrackerbackend.dto.user.RefreshTokenDTO;
import zetta.fitnesstrackerbackend.dto.user.UserDTO;
import zetta.fitnesstrackerbackend.service.KeycloakAdminService;
import zetta.fitnesstrackerbackend.service.UserService;
import zetta.fitnesstrackerbackend.util.TokenUtil;


@EnableWebMvc
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private final KeycloakAdminService keycloakAdminService;

    @Autowired
    public UserController(UserService userService, KeycloakAdminService keycloakAdminService) {
        this.userService = userService;
        this.keycloakAdminService = keycloakAdminService;
    }

    @DeleteMapping("/logout")
    public ResponseEntity<String> logoutUser(RefreshTokenDTO refreshTokenDTO) {
        return keycloakAdminService.logoutUser(refreshTokenDTO);
    }

    @GetMapping("/info")
    public UserDTO getData(JwtAuthenticationToken token){
        return userService.getUserInfo(TokenUtil.getID(token));
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("[TEST] user_controller");
    }

}