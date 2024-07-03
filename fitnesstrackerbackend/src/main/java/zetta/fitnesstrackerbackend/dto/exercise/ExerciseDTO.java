package zetta.fitnesstrackerbackend.dto.exercise;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import zetta.fitnesstrackerbackend.dto.user.UserDTO;
import zetta.fitnesstrackerbackend.entity.Image;
import zetta.fitnesstrackerbackend.vo.Difficulty;
import zetta.fitnesstrackerbackend.vo.DurationType;
import zetta.fitnesstrackerbackend.vo.Visibility;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseDTO {

    private Long id;

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
    private Visibility visibility;

    private Image image;

    private UserDTO author;

}