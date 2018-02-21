package mapeditor;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class StructureService {

    // @Autowired
    // private StructureRepository sRepo;

    @Autowired
    private StructureDefinitionRepository sdRepo;

    //How mutable :/
    public void setDefinition(Structure structure) {
        structure.setDefinition(sdRepo.findOne(structure.getDefinitionId()));
    }


}
