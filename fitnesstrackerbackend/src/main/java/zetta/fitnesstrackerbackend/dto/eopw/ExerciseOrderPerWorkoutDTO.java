package zetta.fitnesstrackerbackend.dto.eopw;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import zetta.fitnesstrackerbackend.dto.workout.WorkoutDTO;
import zetta.fitnesstrackerbackend.dto.exercise.ExerciseDTO;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseOrderPerWorkoutDTO {

    private Long id;

    private int order;

    private ExerciseDTO exercise;

    private WorkoutDTO workout;

}