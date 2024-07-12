package zetta.fitnesstrackerbackend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;
import zetta.fitnesstrackerbackend.dto.exercise.ExerciseDTO;
import zetta.fitnesstrackerbackend.dto.exercise.UpdateExerciseDTO;
import zetta.fitnesstrackerbackend.entity.Exercise;

import java.util.List;

@Component
@Mapper(componentModel = "spring", uses = { UserMapper.class })
public interface ExerciseMapper {

    @Mapping(target = "timestamp", ignore = true)
    Exercise toExercise(ExerciseDTO exerciseDTO);

    List<ExerciseDTO> toExerciseDTO(Page<Exercise> exercises);
    List<ExerciseDTO> toExerciseDTO(List<Exercise> exercises);

    @Mapping(target = "image.id", ignore = true)
    @Mapping(source = "author", target = "author", qualifiedByName = "toUserInfoDTO")
    ExerciseDTO toExerciseDTO(Exercise exercise);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "timesFinished", ignore = true)
    @Mapping(target = "likes", ignore = true)
    @Mapping(target = "timestamp", ignore = true)
    @Mapping(target = "author", ignore = true)
    @Mapping(target = "name", source = "name", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "description", source = "description", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "durationType", source = "durationType", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "difficulty", source = "difficulty", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "type", source = "type", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "visibility", source = "visibility", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "image", source = "image", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Exercise updateExerciseFromDTO(UpdateExerciseDTO exerciseDTO, @MappingTarget Exercise exercise);

}