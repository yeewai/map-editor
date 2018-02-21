package mapeditor.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import mapeditor.StructureDefinitionRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class StructureDefinitionExistsValidator implements
    ConstraintValidator<StructureDefinitionExists, String>
{
    @Autowired
    private StructureDefinitionRepository sdRepo;

    @Override
    public void initialize(StructureDefinitionExists definitionId) {
    }

    @Override
    public boolean isValid(String definitionId, ConstraintValidatorContext cxt) {
        return definitionId != null && definitionId != "" && sdRepo.exists(definitionId);
    }

}
