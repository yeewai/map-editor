package mapeditor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.hibernate.validator.constraints.NotEmpty;
import org.hibernate.validator.constraints.NotBlank;
import javax.validation.constraints.Min;

import java.util.Comparator;
import mapeditor.validation.StructuresDoNotOverlap;

import java.util.Date;
import java.util.List;

import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter @Setter @NoArgsConstructor
@Document(collection = "worlds")
public class World {
    @Id
    private String id;

    @NotBlank(message = "Key can't empty!")
    private String key;

    @NotBlank(message = "Name can't empty!")
    private String name;

    private String description;

    @Min(value=1, message = "Width has to be greater than 0!")
    private int width;

    @Min(value=1, message = "Length has to be greater than 0!")
    private int length;

    private Date createdAt = new Date();

    private String saveMessage;
    private Boolean isPublished = false;

    @StructuresDoNotOverlap
    private List<Structure> structures;


    public static Comparator<World> SortByDate = new Comparator<World>() {
        public int compare(World a, World b) {
            // Newest first
            return b.getCreatedAt().compareTo(a.getCreatedAt());
        }
    };
}
