package zetta.fitnesstrackerbackend.dto.workout;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import zetta.fitnesstrackerbackend.dto.exercise.ExerciseDTO;
import zetta.fitnesstrackerbackend.dto.image.ImageDTO;
import zetta.fitnesstrackerbackend.vo.Difficulty;
import zetta.fitnesstrackerbackend.vo.ExerciseType;
import zetta.fitnesstrackerbackend.vo.Gender;
import zetta.fitnesstrackerbackend.vo.Visibility;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateWorkoutDTO {

    private String name;
    private String description;
    private int calories;
    private int restDuration;
    private Difficulty difficulty;
    private ExerciseType type;
    private Gender gender;
    private Visibility visibility;
    private List<ExerciseDTO> exercises;
    private ImageDTO image;

}