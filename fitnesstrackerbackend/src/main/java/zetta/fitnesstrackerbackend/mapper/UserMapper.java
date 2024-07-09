package zetta.fitnesstrackerbackend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;
import zetta.fitnesstrackerbackend.dto.user.UserDTO;
import zetta.fitnesstrackerbackend.entity.User;

@Component
@Mapper(componentModel = "spring")
public interface UserMapper {

    User toUserEntity(UserDTO userDTO);
    UserDTO toUserDTO(User user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "image.id", ignore = true)
    UserDTO toUserInfoDTO(User user);

}