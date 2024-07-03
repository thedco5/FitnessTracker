package zetta.fitnesstrackerbackend.dto.eopw;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import zetta.fitnesstrackerbackend.dto.workout.WorkoutDTO;
import zetta.fitnesstrackerbackend.dto.exercise.ExerciseDTO;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseOrderPerWorkoutDTO {

    private UUID id;

    private int position;

    private ExerciseDTO exercise;

    private WorkoutDTO workout;

}