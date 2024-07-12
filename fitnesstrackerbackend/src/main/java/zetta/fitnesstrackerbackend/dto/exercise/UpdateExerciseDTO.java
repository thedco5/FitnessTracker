package zetta.fitnesstrackerbackend.dto.exercise;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import zetta.fitnesstrackerbackend.dto.image.ImageDTO;
import zetta.fitnesstrackerbackend.vo.Difficulty;
import zetta.fitnesstrackerbackend.vo.DurationType;
import zetta.fitnesstrackerbackend.vo.ExerciseType;
import zetta.fitnesstrackerbackend.vo.Visibility;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateExerciseDTO {

    private String name;
    private String description;
    private int calories;
    private int duration;
    private DurationType durationType;
    private Difficulty difficulty;
    private ExerciseType type;
    private Visibility visibility;
    private ImageDTO image;

}