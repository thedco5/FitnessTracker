package zetta.fitnesstrackerbackend.dto.like;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import zetta.fitnesstrackerbackend.dto.user.UserDTO;
import zetta.fitnesstrackerbackend.dto.workout.WorkoutDTO;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutLikeDTO {

    private UserDTO author;
    private WorkoutDTO workout;

}