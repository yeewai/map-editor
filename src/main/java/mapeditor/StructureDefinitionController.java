package mapeditor;

import java.util.concurrent.atomic.AtomicLong;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;
// import javax.validation.Validator;
import javax.validation.Valid;

import java.util.List;
import org.springframework.util.Assert;

@RestController
@RequestMapping("/structureDefinitions")
public class StructureDefinitionController {

    private StructureDefinitionRepository structureDefinitionRepository;

    public StructureDefinitionController(StructureDefinitionRepository structureDefinitionRepository) {
        Assert.notNull(structureDefinitionRepository, "Repository must not be null!");
        this.structureDefinitionRepository = structureDefinitionRepository;
    }

    @GetMapping
    public List<StructureDefinition> index() {
        return structureDefinitionRepository.findAll();
    }

    @GetMapping("{id}")
    public StructureDefinition show(@PathVariable( "id" ) String id) {
        return structureDefinitionRepository.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public StructureDefinition create(@RequestBody @Valid StructureDefinition structureDefinition) {
        Assert.isTrue(!structureDefinitionRepository.exists(structureDefinition.getId()), "ID already exists!");
        return structureDefinitionRepository.save(structureDefinition);
    }

    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public StructureDefinition update(
        @PathVariable( "id" ) String id,
        @RequestBody @Valid StructureDefinition structureDefinition
    ) {
        Assert.isTrue(structureDefinitionRepository.exists(id), "ID does not exist!");
        structureDefinition.setId(id);
        return structureDefinitionRepository.save(structureDefinition);
    }

}
