package zetta.fitnesstrackerbackend.dto.user;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import zetta.fitnesstrackerbackend.dto.image.ImageDTO;
import zetta.fitnesstrackerbackend.vo.Gender;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    @Null
    private UUID id;

    private String name;

    @NotBlank(message = "Username is necessary")
    @Pattern(regexp = "^[A-Za-z0-9_]+$", message = "Incorrect username format")
    @Size(min = 4, message = "Username must be longer than 3 characters")
    @Size(max = 32, message = "Username must be shorter than 33 characters")
    private String username;

    @NotBlank(message = "Email is necessary")
    @Email(message = "Incorrect email format")
    private String email;

    @NotBlank(message = "Password is necessary")
    @Pattern(regexp = "^[A-Za-z0-9_!@#$%^&*()+=-]+$", message = "Incorrect password format")
    @Size(min = 8, message = "Password must be longer than 7 characters")
    @Size(max = 16, message = "Password must be shorter than 17 characters")
    private String password;

    @Min(0)
    @Max(0)
    private int exercisesFinished;

    private Gender gender;

    private ImageDTO image;

}