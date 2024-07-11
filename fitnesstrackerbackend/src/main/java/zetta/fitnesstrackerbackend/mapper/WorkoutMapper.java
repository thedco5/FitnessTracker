package zetta.fitnesstrackerbackend.mapper;

import org.mapstruct.*;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;
import zetta.fitnesstrackerbackend.dto.exercise.UpdateExerciseDTO;
import zetta.fitnesstrackerbackend.dto.workout.UpdateWorkoutDTO;
import zetta.fitnesstrackerbackend.dto.workout.WorkoutDTO;
import zetta.fitnesstrackerbackend.entity.Exercise;
import zetta.fitnesstrackerbackend.entity.Workout;

import java.util.List;

@Component
@Mapper(componentModel = "spring")
public interface WorkoutMapper {

    @Mapping(target = "timestamp", ignore = true)
    Workout toWorkout(WorkoutDTO workoutDTO);

    @Mapping(target = "likes", ignore = true)
    @Mapping(target = "author.id", ignore = true)
    @Mapping(target = "author.password", ignore = true)
    @Mapping(target = "author.image.id", ignore = true)
    WorkoutDTO toWorkoutDTO(Workout workout);

    List<WorkoutDTO> toWorkoutDTO(Page<Workout> workout);

    @Named("toWorkoutInfoDTO")
    @Mapping(target = "author.password", ignore = true)
    @Mapping(target = "liked", ignore = true)
    @Mapping(target = "saved", ignore = true)
    @Mapping(target = "exercises", ignore = true)
    WorkoutDTO toWorkoutInfoDTO(Workout workout);

    @Mapping(target = "name", source = "name", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "description", source = "description", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "difficulty", source = "difficulty", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "type", source = "type", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "gender", source = "gender", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "visibility", source = "visibility", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "image", source = "image", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Workout updateWorkoutFromDTO(UpdateWorkoutDTO workoutDTO, @MappingTarget Workout workout);

}