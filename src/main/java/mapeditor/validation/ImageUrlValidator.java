package mapeditor.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import mapeditor.StructureDefinitionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import org.springframework.util.Assert;

public class ImageUrlValidator implements ConstraintValidator<ImageUrl, String> {

    @Override
    public void initialize(final ImageUrl constraintAnnotation) {
    }

    @Override
    public boolean isValid(String imageUrl, ConstraintValidatorContext cxt) {
        return imageUrl != null && imageUrl.matches("https?://.*/.*(svg|gif|png)");
    }

}
