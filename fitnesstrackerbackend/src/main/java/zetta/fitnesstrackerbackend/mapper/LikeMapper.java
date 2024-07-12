package zetta.fitnesstrackerbackend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;
import zetta.fitnesstrackerbackend.dto.like.WorkoutLikeDTO;
import zetta.fitnesstrackerbackend.entity.like.WorkoutLike;

import java.util.List;

@Component
@Mapper(componentModel = "spring", uses = { UserMapper.class, WorkoutMapper.class })
public interface LikeMapper {

    @Mapping(source = "author", target = "author", qualifiedByName = "toUserInfoDTO")
    @Mapping(source = "workout", target = "workout", qualifiedByName = "toWorkoutInfoDTO")
    List<WorkoutLikeDTO> toWorkoutLikeDTO(Page<WorkoutLike> workouts);

}