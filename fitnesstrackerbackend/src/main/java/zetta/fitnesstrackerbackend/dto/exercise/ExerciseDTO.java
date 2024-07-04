package zetta.fitnesstrackerbackend.dto.exercise;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    private UUID id;

    @NotBlank
    private String name;

    @NotBlank
    private String description;

    private int timesFinished;
    private int likes;
    private int calories;
    private int duration;

    @NotNull
    private DurationType durationType;

    @NotNull
    private Difficulty difficulty;

    @NotNull
    private ExerciseType type;

    @NotNull
    private Visibility visibility;

    private ImageDTO image;
    private UserDTO author;

}