package mapeditor.validation;

import java.lang.annotation.ElementType;
import java.lang.annotation.RetentionPolicy;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Documented
@Constraint(validatedBy = StructureDefinitionExistsValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface StructureDefinitionExists {
    String message() default "Structure Definition does not exist!";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
