package zetta.fitnesstrackerbackend.mapper;

import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;
import zetta.fitnesstrackerbackend.dto.user.UserDTO;
import zetta.fitnesstrackerbackend.entity.User;

@Component
@Mapper(componentModel = "spring")
public interface UserMapper {

    User toUserEntity(UserDTO userDTO);

}