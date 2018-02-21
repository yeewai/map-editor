package mapeditor.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import mapeditor.StructureDefinitionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import org.springframework.util.Assert;

// import mapeditor.World;
import mapeditor.StructureDefinitionRepository;
import mapeditor.StructureDefinition;
import mapeditor.Structure;

public class StructuresDoNotOverlapValidator implements ConstraintValidator<StructuresDoNotOverlap, List<Structure>> {
    @Autowired
    private StructureDefinitionRepository sdRepo;

    @Override
    public void initialize(final StructuresDoNotOverlap constraintAnnotation) {
    }

    private Boolean isOverlapping( int ax, int ay, int aw, int al, int bx, int by, int bw, int bl) {
        if (ax + aw <= bx) return false; // a is left of b
        if (ax >= bx + bw) return false; // a is right of b
        if (ay + al <= by) return false; // a is above b
        if (ay >= by + bl) return false; // a is below b
        return true; // boxes overlap
    }

    @Override
    public boolean isValid(List<Structure> structures, ConstraintValidatorContext cxt) {
        if ( structures == null ) { return true; }
        Assert.notNull(sdRepo, "Repository must not be null!");
        for ( Structure s1 : structures ) {
            StructureDefinition sd1 = sdRepo.findOne(s1.getDefinitionId());

            for ( Structure s2 : structures ) {
                StructureDefinition sd2 = sdRepo.findOne(s2.getDefinitionId());
                if (isOverlapping( s1.getXPosition(), s1.getYPosition(), sd1.getWidth(), sd1.getLength(),
                    s2.getXPosition(), s2.getYPosition(), sd2.getWidth(), sd2.getLength()) && s1 != s2
                ) {
                    return false;
                }
            }

        }
        return true;
    }

}
