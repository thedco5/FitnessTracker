package zetta.fitnesstrackerbackend.dto.image;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImageDTO {

    private UUID id;

    @NotNull
    private String data;

}