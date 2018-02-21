package mapeditor.validation;

import java.util.Set;
import java.util.List;
import java.util.Arrays;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.util.Assert;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import static org.mockito.Mockito.when;
import org.springframework.boot.test.mock.mockito.MockBean;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Before;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.ContextConfiguration;

import org.springframework.beans.factory.annotation.Autowired;
import mapeditor.World;
import mapeditor.Structure;
import mapeditor.StructureDefinition;
import mapeditor.StructureDefinitionRepository;
import mapeditor.ApplicationConfiguration;


import org.hibernate.validator.HibernateValidator;
import org.junit.Before;
import org.junit.Test;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;


@SpringBootTest
@RunWith(SpringRunner.class)
public class ImageUrlValidatorTest {

    private static ValidatorFactory validatorFactory;
    private static Validator validator;

    //
    // @Before
    // public void setup() {
    //     localValidatorFactory = new LocalValidatorFactoryBean();
    //     localValidatorFactory.setProviderClass(HibernateValidator.class);
    //     localValidatorFactory.afterPropertiesSet();
    // }
    // @Test
    // public void testLongNameWithInvalidCharCausesValidationError() {
    //     final ProductModel productModel = new ProductModel();
    //     productModel.setLongName("A long name with\t a Tab character");
    // 	Set<ConstraintViolation<ProductModel>> constraintViolations = localValidatorFactory.validate(productModel);
    // 	Assert.assertTrue("Expected validation error not found", constraintViolations.size() == 1);
    // }

    StructureDefinition sd;

    @Before
    public void setUp(){
        sd = new StructureDefinition();
        sd.setId("someId");
        sd.setName("Some Name");
        sd.setWidth(2);
        sd.setLength(2);
        sd.setKind("Some kind");
   }

    @BeforeClass
    public static void createValidator() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }

    @Test
    public void shouldHaveNoViolations() {
        sd.setImageUrl("https://somewebsite.com/image.svg");
        Set<ConstraintViolation<StructureDefinition>> violations= validator.validate(sd);
        Assert.isTrue(violations.isEmpty());
    }

    @Test
    public void shouldDetectInvalidImageUrl() {
        String badUrl = "https://somewebsite.com/image";
        sd.setImageUrl(badUrl);
        Set<ConstraintViolation<StructureDefinition>> violations= validator.validate(sd);

        //then:
        assertEquals(1, violations.size());

        ConstraintViolation<StructureDefinition> violation = violations.iterator().next();
        assertEquals("Image URL has to be a valid svg, png, or gif!",violation.getMessage());
        assertEquals("imageUrl", violation.getPropertyPath().toString());
        assertEquals(badUrl, violation.getInvalidValue());
    }


    // @Test
    // public void structures_should_not_overlap() throws Exception {
    //
    //
    //     RequestWrapper requestWrapper = new RequestWrapper();
    //     requestWrapper.setRequest(Arrays.asList(s1,s2));
    //
    //     Errors errors = new BeanPropertyBindingResult(requestWrapper, "requestWrapper");
    //     userRequestValidator.validate(requestWrapper, errors);
    //
    //     assertTrue(errors.hasErrors());
    //     assertNotNull(errors.getFieldError("firstName"));
    // }
}
