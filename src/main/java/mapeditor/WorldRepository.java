package mapeditor;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

public interface WorldRepository extends MongoRepository<World, String> {
    World findById(String id);
    List<World> findByKey(String key);
    List<World> findByKeyAndIsPublished(String key, Boolean isPublished);
}
