package mapeditor;

import org.springframework.beans.factory.annotation.Autowired;

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
    @Autowired
    private StructureDefinitionService sdService;

    @GetMapping
    public List<StructureDefinition> index() {
        return sdService.findAll();
    }

    //[TODO] I should make a route to get just the definitions pertinent to a world

    @GetMapping("{id}")
    public StructureDefinition show(@PathVariable( "id" ) String id) {
        return sdService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public StructureDefinition create(@RequestBody @Valid StructureDefinition structureDefinition) {
        return sdService.create(structureDefinition);
    }

    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public StructureDefinition update(
        @PathVariable( "id" ) String id,
        @RequestBody @Valid StructureDefinition structureDefinition
    ) {
        return sdService.update(id, structureDefinition);
    }

}
