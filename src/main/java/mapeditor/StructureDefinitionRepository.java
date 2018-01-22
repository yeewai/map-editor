package mapeditor;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

public interface StructureDefinitionRepository extends MongoRepository<StructureDefinition, String> {
    StructureDefinition findById(String id);
}
