package zetta.fitnesstrackerbackend.service;

import org.springframework.http.ResponseEntity;
import zetta.fitnesstrackerbackend.dto.user.UserDTO;

public interface UserService {

    ResponseEntity<String> createUser(UserDTO userDTO);

}