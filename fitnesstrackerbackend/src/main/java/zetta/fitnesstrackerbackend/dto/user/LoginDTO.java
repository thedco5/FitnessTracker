package zetta.fitnesstrackerbackend.dto.user;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginDTO {

    @NotBlank(message = "Username/Email is necessary")
    private String username;

    @NotBlank(message = "Password is necessary")
    private String password;

}