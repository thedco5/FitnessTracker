package zetta.fitnesstrackerbackend.dto.exercise;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import zetta.fitnesstrackerbackend.dto.image.ImageDTO;
import zetta.fitnesstrackerbackend.dto.user.UserDTO;
import zetta.fitnesstrackerbackend.vo.Difficulty;
import zetta.fitnesstrackerbackend.vo.DurationType;
import zetta.fitnesstrackerbackend.vo.ExerciseType;
import zetta.fitnesstrackerbackend.vo.Visibility;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseDTO {

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

    @Min(value = 0, message = "Duration cannot be less than 0")
    private int duration;

    @NotNull(message = "Duration must be selected")
    private DurationType durationType;

    @NotNull(message = "Difficulty must be selected")
    private Difficulty difficulty;

    @NotNull(message = "Exercise type must be selected")
    private ExerciseType type;

    @NotNull(message = "Visibility must be selected")
    private Visibility visibility;

    private ImageDTO image;

    @Null
    private UserDTO author;

}