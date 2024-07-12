package zetta.fitnesstrackerbackend.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import zetta.fitnesstrackerbackend.dto.image.ImageDTO;
import zetta.fitnesstrackerbackend.vo.Gender;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserDTO {

    private String name;
    private Gender gender;
    private ImageDTO image;

}