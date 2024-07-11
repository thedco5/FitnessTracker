package zetta.fitnesstrackerbackend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.stereotype.Component;
import zetta.fitnesstrackerbackend.dto.workout.WorkoutDTO;
import zetta.fitnesstrackerbackend.entity.Workout;

@Component
@Mapper(componentModel = "spring")
public interface WorkoutMapper {

    @Named("toWorkoutDTO")
    @Mapping(target = "author.password", ignore = true)
    @Mapping(target = "liked", ignore = true)
    WorkoutDTO toWorkoutDTO(Workout workout);

}