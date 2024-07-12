package zetta.fitnesstrackerbackend.dto.saved;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import zetta.fitnesstrackerbackend.dto.user.UserDTO;
import zetta.fitnesstrackerbackend.dto.exercise.ExerciseDTO;
import zetta.fitnesstrackerbackend.dto.workout.WorkoutDTO;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SavedWorkoutDTO {

    private UserDTO author;
    private WorkoutDTO workout;

}