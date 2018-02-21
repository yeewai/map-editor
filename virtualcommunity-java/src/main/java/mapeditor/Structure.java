package mapeditor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.hibernate.validator.constraints.NotEmpty;
import org.hibernate.validator.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Min;

import mapeditor.validation.StructureDefinitionExists;
import org.springframework.beans.factory.annotation.Autowired;

import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter @Setter @NoArgsConstructor
public class Structure {
    @NotBlank(message = "Name can't empty!")
    private String name;

    private String description;

    @Min(value=0, message = "X Position has to be at least than 0!")
    private int xPosition;

    @Min(value=0, message = "Y Position has to be at least than 0!")
    private int yPosition;

    @StructureDefinitionExists(message = "Must have a valid definition (id)!")
    private String definitionId;

    private StructureDefinition definition;
    // private String worldId;
}
