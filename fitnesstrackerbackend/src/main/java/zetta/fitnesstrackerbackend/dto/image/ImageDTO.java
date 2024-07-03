package zetta.fitnesstrackerbackend.dto.image;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImageDTO {

    private Long id;

    @NotBlank
    private String name;

    @NotNull
    private byte[] data;

}