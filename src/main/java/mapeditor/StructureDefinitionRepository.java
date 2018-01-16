package mapeditor;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

public interface StructureDefinitionRepository extends MongoRepository<StructureDefinition, String> {
    StructureDefinition findById(String id);
}
