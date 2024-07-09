package zetta.fitnesstrackerbackend.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import zetta.fitnesstrackerbackend.dto.image.ImageDTO;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PublicUserDTO {

    private String name;
    private String username;

    private int exercisesFinished;
    private ImageDTO image;

}