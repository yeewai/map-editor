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
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import org.springframework.util.Assert;

@RestController
@RequestMapping("/worlds")
public class WorldController {

    @Autowired
    private WorldService worldService;

    @GetMapping
    public List<World> index() {
        return worldService.findAll();
    }

    @GetMapping("{key}")
    public World show(@PathVariable( "key" ) String key) {
        // Returns the most recent world that's published with the given key.
        return worldService.findMostRecentPublishedByKey(key);
    }

    @GetMapping("{key}/versions")
    public List<World> showVersions(@PathVariable( "key" ) String key) {
        return worldService.findByKey(key);
    }

    @GetMapping("{key}/{id}")
    public World showVersion(@PathVariable( "key" ) String key, @PathVariable( "id" ) String id) {
        return worldService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public World create(@RequestBody @Valid World world) {
        return worldService.create(world);
    }
}
