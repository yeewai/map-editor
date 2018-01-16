package mapeditor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.hibernate.validator.constraints.NotEmpty;
import org.hibernate.validator.constraints.NotBlank;
import javax.validation.constraints.Min;

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
    public String kind;

    // public StructureDefinition() {}
    // public StructureDefinition( String name, String description, int width, int length, String kind) {
    //     this.name = name;
    //     this.description = description;
    //     this.width = width;
    //     this.length = length;
    //     this.kind = kind;
    // }

    public String getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public int getWidth() { return width; }
    public int getLength() { return length; }
    public String getKind() { return kind; }

    public void setId(String id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }
    public void setWidth(int width) { this.width = width; }
    public void setLength(int length) { this.length = length; }
    public void setKind(String kind) { this.kind = kind; }

}
