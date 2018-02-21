package mapeditor;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.util.Assert;
import java.util.Collections;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
public class StructureDefinitionService {

    @Autowired
    private StructureDefinitionRepository structureDefinitionRepository;

    public List<StructureDefinition> findAll() {
        return structureDefinitionRepository.findAll();
    }

    public StructureDefinition findById( String id) {
        return structureDefinitionRepository.findOne(id);
    }

    public StructureDefinition create(StructureDefinition structureDefinition) {
        Assert.isTrue(structureDefinition.getId() == null || !structureDefinitionRepository.exists(structureDefinition.getId()), "ID already exists!");

        return structureDefinitionRepository.save(structureDefinition);
    }

    public StructureDefinition update( String id, StructureDefinition structureDefinition ) {
        Assert.isTrue(structureDefinitionRepository.exists(id), "ID does not exist!");
        structureDefinition.setId(id);

        return structureDefinitionRepository.save(structureDefinition);
    }
}
