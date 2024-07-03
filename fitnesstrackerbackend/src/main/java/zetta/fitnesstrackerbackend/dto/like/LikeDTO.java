package zetta.fitnesstrackerbackend.dto.like;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import zetta.fitnesstrackerbackend.dto.user.UserDTO;
import zetta.fitnesstrackerbackend.dto.exercise.ExerciseDTO;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LikeDTO {

    private UUID id;

    private UserDTO author;
    private ExerciseDTO exercise;

}