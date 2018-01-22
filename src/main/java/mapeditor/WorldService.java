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
public class WorldService {
    @Autowired
    private WorldRepository worldRepo;

    @Autowired
    private StructureService structureService;

    public List<World> findAll() {
        return worldRepo.findAll();
    }

    public World findById(String id) {
        return worldRepo.findOne(id);
    }

    public List<World> findByKey(String key) {
        List<World> worlds = worldRepo.findByKey(key);
        Collections.sort(worlds, World.SortByDate);
        return worlds;
    }

   public World findMostRecentPublishedByKey(String key) {
        List<World> worlds = worldRepo.findByKeyAndIsPublished(key, true);
        Collections.sort(worlds, World.SortByDate);
        if ( worlds.size() < 1 ) { return null; }
        return worlds.get(0);
    }

    public World create(World world) {
        Assert.isTrue(world.getId() == null || !worldRepo.exists(world.getId()), "ID already exists!");
        //[TODO] : Figure out how to ignore id and createdAt field in the json when converting.
        // It should probably be done in the model btw. Pretty sure this is not the correct solution.

        // I'm pretty sure there's an automatic way to do this...
        // Though, doing this, what happens if I update a structureDefinition?
        if ( world.getStructures() != null ) {
            for ( Structure s : world.getStructures() ) {
                structureService.setDefinition(s);
                // s.setWorldId(world.getId());
            }
        }

        return worldRepo.save(world);
    }


    // I should move this to a helper file
    // public static <T> Predicate<T> distinctByKey(Function<? super T, Object> keyExtractor)
    // {
    //     Map<Object, Boolean> map = new ConcurrentHashMap<>();
    //     return t -> map.putIfAbsent(keyExtractor.apply(t), Boolean.TRUE) == null;
    // }
    //
    // This was going to be used for an index route that just returned the unique worlds.
    // I may reimplement that later if the current route returns too much data.
    // public List<World> findAllUnique() {
    //     return worldRepo.findAll().stream().filter(distinctByKey(w -> w.getKey())).collect(Collectors.toList());
    // }

    // public World findMostRecentByKey(String key) {
    //     return findByKey(key).get(0);
    // }
}
