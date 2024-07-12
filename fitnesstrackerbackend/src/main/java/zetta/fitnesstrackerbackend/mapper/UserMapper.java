package zetta.fitnesstrackerbackend.mapper;

import org.mapstruct.*;
import org.springframework.stereotype.Component;
import zetta.fitnesstrackerbackend.dto.user.UpdateUserDTO;
import zetta.fitnesstrackerbackend.dto.user.UserDTO;
import zetta.fitnesstrackerbackend.entity.User;

@Component
@Mapper(componentModel = "spring")
public interface UserMapper {

    User toUserEntity(UserDTO userDTO);

    @Mapping(target = "password", ignore = true)
    UserDTO toUserDTO(User user);

    @Named("toUserInfoDTO")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    UserDTO toUserInfoDTO(User user);

    @Mapping(source = "name", target = "name", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(source = "gender", target = "gender", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(source = "image", target = "image", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    User updateUserInfoFromDTO(UpdateUserDTO updateUserDTO, @MappingTarget User user);

}