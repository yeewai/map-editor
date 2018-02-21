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
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;


@SpringBootTest
@RunWith(SpringRunner.class)
public class StructuresDoNotOverlapValidatorTest {

    @MockBean
    private StructureDefinitionRepository sdRepo;

    private StructureDefinition sd;
    private World world;

    private LocalValidatorFactoryBean localValidatorFactory;

    @Before
    public void setUp(){
        localValidatorFactory = new LocalValidatorFactoryBean();
        localValidatorFactory.setProviderClass(HibernateValidator.class);
        localValidatorFactory.afterPropertiesSet();

        sd = new StructureDefinition();
        sd.setId("someId");
        sd.setWidth(2);
        sd.setLength(2);

        world = new World();
        world.setKey("Some Key");
        world.setName("Some name");
        world.setWidth(10);
        world.setLength(10);
   }

    @Test
    public void shouldHaveNoViolations() {
        Structure s1 = new Structure();
        s1.setDefinition(sd);
        s1.setDefinitionId("someId");
        s1.setXPosition(1);
        s1.setYPosition(1);

        Structure s2 = new Structure(); //overlaps s1
        s2.setDefinition(sd);
        s2.setDefinitionId("someId");
        s2.setXPosition(3);
        s2.setYPosition(3);

        when(sdRepo.findOne(s1.getDefinitionId()))
            .thenReturn(sd);

        world.setStructures(Arrays.asList(s1, s2));
        Set<ConstraintViolation<World>> violations= localValidatorFactory.validate(world);

        Assert.isTrue(violations.isEmpty());
    }

    @Test
    public void shouldDetectInvalidName() {
        Structure s1 = new Structure();
        s1.setDefinition(sd);
        s1.setDefinitionId("someId");
        s1.setXPosition(1);
        s1.setYPosition(1);

        Structure s2 = new Structure(); //overlaps s1
        s2.setDefinition(sd);
        s2.setDefinitionId("someId");
        s2.setXPosition(2);
        s2.setYPosition(2);

        when(sdRepo.findOne(s1.getDefinitionId()))
            .thenReturn(sd);

        world.setStructures(Arrays.asList(s1, s2));

        //when:
        Set<ConstraintViolation<World>> violations = localValidatorFactory.validate(world);

        //then:
        assertEquals(1, violations.size());

        ConstraintViolation<World> violation = violations.iterator().next();
        assertEquals("size must be between 3 and 3",violation.getMessage());
        assertEquals("name", violation.getPropertyPath().toString());
        assertEquals("a", violation.getInvalidValue());
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
