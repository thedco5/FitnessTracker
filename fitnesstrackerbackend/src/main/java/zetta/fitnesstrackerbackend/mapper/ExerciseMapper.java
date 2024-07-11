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

    Exercise toExercise(ExerciseDTO exerciseDTO);
    List<ExerciseDTO> toExerciseDTO(Page<Exercise> exercises);

    @Mapping(target = "image.id", ignore = true)
    @Mapping(source = "author", target = "author", qualifiedByName = "toUserInfoDTO")
    ExerciseDTO toExerciseDTO(Exercise exercise);

    @Mapping(target = "name", source = "name", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Exercise updateExerciseFromDTO(UpdateExerciseDTO exerciseDTO, @MappingTarget Exercise exercise);

}