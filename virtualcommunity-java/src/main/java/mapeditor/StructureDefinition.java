package mapeditor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.hibernate.validator.constraints.NotEmpty;
import org.hibernate.validator.constraints.NotBlank;
import javax.validation.constraints.Min;
import mapeditor.validation.ImageUrl;

import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter @Setter @NoArgsConstructor
@Document(collection = "structureDefinition")
public class StructureDefinition {
    @Id
    private String id;

    @NotBlank(message = "Name can't empty!")
    private String name;

    private String description;

    @Min(value=1, message = "Width has to be greater than 0!")
    private int width;

    @Min(value=1, message = "Length has to be greater than 0!")
    private int length;

    @NotBlank(message = "Kind can't empty!")
    private String kind;

    @ImageUrl(message = "Image URL has to be a valid svg, png, or gif!")
    private String imageUrl;
}
