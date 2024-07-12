package zetta.fitnesstrackerbackend.service;

import org.springframework.http.ResponseEntity;
import zetta.fitnesstrackerbackend.dto.user.UpdateUserDTO;
import zetta.fitnesstrackerbackend.dto.user.UserDTO;

import java.util.UUID;

public interface UserService {

    ResponseEntity<String> createUser(UserDTO userDTO);
    UserDTO getUserInfo(UUID id);
    ResponseEntity<String> updateUserInfo(UpdateUserDTO userDTO, UUID id);

}