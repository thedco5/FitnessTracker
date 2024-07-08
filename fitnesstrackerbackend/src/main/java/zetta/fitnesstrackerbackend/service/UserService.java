package zetta.fitnesstrackerbackend.service;

import org.springframework.http.ResponseEntity;
import zetta.fitnesstrackerbackend.dto.user.UserDTO;
import zetta.fitnesstrackerbackend.dto.user.UserInfoDTO;

import java.util.UUID;

public interface UserService {

    ResponseEntity<String> createUser(UserDTO userDTO);
    UserInfoDTO getUser(UUID id);

}