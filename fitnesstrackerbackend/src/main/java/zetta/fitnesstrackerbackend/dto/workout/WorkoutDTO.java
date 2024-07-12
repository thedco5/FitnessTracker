package zetta.fitnesstrackerbackend.dto.workout;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import zetta.fitnesstrackerbackend.dto.exercise.ExerciseDTO;
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
public class WorkoutDTO {

    @Null
    private UUID id;

    @NotBlank(message = "Name is necessary")
    private String name;

    @NotBlank(message = "Description is necessary")
    private String description;

    @Min(0) @Max(0)
    private int timesFinished;

    @Min(0) @Max(0)
    private int likes;

    @Min(value = 0, message = "Calories cannot be less than 0")
    private int calories;

    @Min(value = 0, message = "Rest duration cannot be less than 0")
    private int restDuration;

    private boolean liked;
    private boolean saved;

    private Difficulty difficulty;
    private ExerciseType type;
    private Gender gender;

    @NotNull(message = "Visibility must be selected")
    private Visibility visibility;

    private List<ExerciseDTO> exercises;
    private ImageDTO image;

    @Null
    private UserDTO author;

}