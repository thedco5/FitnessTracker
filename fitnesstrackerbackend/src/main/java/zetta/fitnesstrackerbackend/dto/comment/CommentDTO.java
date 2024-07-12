package zetta.fitnesstrackerbackend.dto.comment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Null;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import zetta.fitnesstrackerbackend.dto.user.UserDTO;
import zetta.fitnesstrackerbackend.dto.workout.WorkoutDTO;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {

    @NotBlank(message = "Content must be filled")
    private String content;

    @Null
    private UserDTO author;

    @Null
    private WorkoutDTO workout;

}