package zetta.fitnesstrackerbackend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;
import zetta.fitnesstrackerbackend.dto.saved.SavedWorkoutDTO;
import zetta.fitnesstrackerbackend.entity.SavedWorkout;

import java.util.List;

@Component
@Mapper(componentModel = "spring")
public interface SavedMapper {

    @Mapping(source = "author", target = "author", qualifiedByName = "toUserInfoDTO")
    @Mapping(source = "workout", target = "workout", qualifiedByName = "toWorkoutInfoDTO")
    List<SavedWorkoutDTO> toSavedWorkoutDTO(Page<SavedWorkout> savedWorkouts);

}