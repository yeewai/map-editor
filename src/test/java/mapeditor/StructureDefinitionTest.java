package mapeditor;

import java.util.Arrays;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.util.Assert;
import static org.assertj.core.api.Assertions.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.web.util.NestedServletException;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
public class StructureDefinitionTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private StructureDefinitionRepository structureDefinitionRepository;

    /****************************************
     * Index
     * ***************************************/
    @Test
    public void should_list_all_structure_definitions() throws Exception {
        String id1 = "sup";
        String id2 = "heyyyyy";

        StructureDefinition sd1 = new StructureDefinition();
        sd1.setId(id1);
        StructureDefinition sd2 = new StructureDefinition();
        sd2.setId(id2);

        when(structureDefinitionRepository.findAll())
            .thenReturn(Arrays.asList(sd1, sd2));
        MvcResult result = this.mockMvc
            .perform(get("/structureDefinitions"))
            .andExpect(status().isOk())
            .andReturn();

        String content = result.getResponse().getContentAsString();

        Assert.hasText(content, id1);
        Assert.hasText(content, id2);
    }


    /****************************************
     * Show
     * ***************************************/
    @Test
    public void should_show_structure_definitions() throws Exception {
        StructureDefinition sd1 = new StructureDefinition();
        sd1.setId("Sup");
        sd1.setName("Some name");
        sd1.setDescription("Some description");
        sd1.setWidth(1);
        sd1.setLength(2);
        sd1.setKind("Some kind");

        when(structureDefinitionRepository.findById(sd1.getId()))
            .thenReturn(sd1);
        MvcResult result = this.mockMvc
            .perform(get("/structureDefinitions/"+sd1.getId()))
            .andExpect(status().isOk())
            .andReturn();

        String content = result.getResponse().getContentAsString();

        Assert.hasText(content, sd1.getId());

    }

    /****************************************
     * Create
     * ***************************************/
    @Test
    public void should_not_create_a_structure_definition_if_missing_parameters() throws Exception {
        String json = "{}";
        when(structureDefinitionRepository.save(Mockito.any(StructureDefinition.class))).thenReturn(new StructureDefinition());
        this.mockMvc
            .perform(post("/structureDefinitions").contentType(MediaType.APPLICATION_JSON).content(json))
            .andDo(print())
            .andExpect(status().isBadRequest());
    }

    @Test
    public void should_create_a_structure_definition() throws Exception {
        String json = "{\"name\": \"New??????\", \"description\": \"Suuuuuup\", \"width\": 1, \"length\": 2, \"kind\": \">?????\"}";
        when(structureDefinitionRepository.save(Mockito.any(StructureDefinition.class)))
            .thenReturn(new StructureDefinition());
        this.mockMvc
            .perform(post("/structureDefinitions").contentType(MediaType.APPLICATION_JSON).content(json))
            .andDo(print())
            .andExpect(status().isCreated());
            //.andExpect(header().string("Location", "/structureDefinitions/c")); //This is probably a smarter way to do it...
    }

    @Test
    public void should_not_create_a_structure_definition_if_id_already_exists() throws Exception {
        String json = "{\"id\": \"c\", \"name\": \"New??????\", \"description\": \"Suuuuuup\", \"width\": 1, \"length\": 2, \"kind\": \">?????\"}";
        when(structureDefinitionRepository.exists("c")).thenReturn(true);

        Throwable thrown = catchThrowable(() -> { 
            this.mockMvc
                .perform(post("/structureDefinitions").contentType(MediaType.APPLICATION_JSON).content(json));
        });
        assertThat(thrown).hasMessageContaining("ID already exists!");
    }

    /****************************************
     * Update
     * ***************************************/
    @Test
    public void should_not_update_a_structure_definition_if_missing_parameters() throws Exception {
        String json = "{}";
        when(structureDefinitionRepository.save(Mockito.any(StructureDefinition.class))).thenReturn(new StructureDefinition());
        this.mockMvc
            .perform(put("/structureDefinitions/someid").contentType(MediaType.APPLICATION_JSON).content(json))
            .andDo(print())
            .andExpect(status().isBadRequest());
    }

    @Test
    public void should_update_a_structure_definition() throws Exception {
        String json = "{\"id\": \"someid\", \"name\": \"New??????\", \"description\": \"Suuuuuup\", \"width\": 1, \"length\": 2, \"kind\": \">?????\"}";

        when(structureDefinitionRepository.exists(Mockito.any(String.class))).thenReturn(true);
        when(structureDefinitionRepository.save(Mockito.any(StructureDefinition.class)))
            .thenReturn(new StructureDefinition());

        this.mockMvc
            .perform(put("/structureDefinitions/someid").contentType(MediaType.APPLICATION_JSON).content(json))
            .andDo(print())
            .andExpect(status().isOk());
            //.andExpect(header().string("Location", "/structureDefinitions/c")); //This is probably a smarter way to do it...
    }

    @Test
    public void should_not_update_a_structure_definition_if_id_does_not_exist() throws Exception {
        String json = "{\"id\": \"someid\", \"name\": \"New??????\", \"description\": \"Suuuuuup\", \"width\": 1, \"length\": 2, \"kind\": \">?????\"}";

        when(structureDefinitionRepository.exists("someid")).thenReturn(false);

        try {
            this.mockMvc
                .perform(put("/structureDefinitions/someid").contentType(MediaType.APPLICATION_JSON).content(json));
            Assert.isTrue(false, "Expected an Illegal Argument Exception to be thrown");
        } catch (NestedServletException e) {
            Assert.hasText(e.getMessage(), "ID does not exist!");
        }
    }

}
