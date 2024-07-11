package zetta.fitnesstrackerbackend.dto.workout;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import zetta.fitnesstrackerbackend.dto.exercise.ExerciseDTO;
import zetta.fitnesstrackerbackend.dto.exercise.UpdateExerciseDTO;
import zetta.fitnesstrackerbackend.dto.image.ImageDTO;
import zetta.fitnesstrackerbackend.dto.user.UserDTO;
import zetta.fitnesstrackerbackend.vo.Difficulty;
import zetta.fitnesstrackerbackend.vo.ExerciseType;
import zetta.fitnesstrackerbackend.vo.Gender;
import zetta.fitnesstrackerbackend.vo.Visibility;

import java.util.List;
import java.util.UUID;

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