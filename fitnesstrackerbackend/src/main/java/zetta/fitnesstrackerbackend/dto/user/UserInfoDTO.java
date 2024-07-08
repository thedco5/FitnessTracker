package zetta.fitnesstrackerbackend.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import zetta.fitnesstrackerbackend.dto.image.ImageDTO;
import zetta.fitnesstrackerbackend.vo.Gender;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoDTO {

    private String name;
    private String username;
    private String email;

    private int exercises_finished;
    private Gender gender;
    private ImageDTO image;

}