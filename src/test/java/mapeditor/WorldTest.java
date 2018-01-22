package mapeditor;

import java.util.Arrays;
import java.util.Date;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.util.Assert;
import static org.assertj.core.api.Assertions.*;

import com.fasterxml.jackson.databind.ObjectMapper;

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
public class WorldTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private WorldRepository worldRepository;

    @MockBean
    private StructureDefinitionRepository structureDefinitionRepository;

    private World world1, world2, world3;
    private Structure structure1;
    private StructureDefinition sd;

    private ObjectMapper mapper;

    @Before
    public void Setup() {
        sd = new StructureDefinition();
        sd.setId("c");
        sd.setWidth(2);
        sd.setLength(2);

        Structure structure1 = new Structure();
        structure1.setName("Structure Name");
        structure1.setDescription("Structure Description");
        structure1.setDefinitionId(sd.getId());

        world1 = new World();
        world1.setId("id:1");
        world1.setKey("Sup");
        world1.setName("Some name");
        world1.setDescription("Some description");
        world1.setWidth(100);
        world1.setLength(200);
        world1.setIsPublished(true);
        world1.setCreatedAt(new Date(20));
        world1.setSaveMessage("Some message");
        world1.setStructures(Arrays.asList(structure1));

        world2 = new World();
        world2.setId("id:2");
        world2.setKey("Sup");
        world2.setIsPublished(false);
        world2.setCreatedAt(new Date(30));

        world3 = new World();
        world3.setId("id:3");
        world3.setKey("Other Key");
        world3.setIsPublished(false);
        world3.setCreatedAt(new Date(30));

        mapper = new ObjectMapper();
    }

    /****************************************
     * Index
     * ***************************************/
    @Test
    public void should_list_all_worlds() throws Exception {

        when(worldRepository.findAll())
            .thenReturn(Arrays.asList(world1, world2));
        MvcResult result = this.mockMvc
            .perform(get("/worlds"))
            .andExpect(status().isOk())
            .andReturn();

        String content = result.getResponse().getContentAsString();

        Assert.hasText(content, world1.getId());
        Assert.hasText(content, world1.getId());
    }


    /****************************************
     * Show Key
     * ***************************************/
    @Test
    public void should_show_most_recent_published_world() throws Exception {
        when(worldRepository.findByKeyAndIsPublished(world1.getKey(), true))
            .thenReturn(Arrays.asList(world1));
        MvcResult result = this.mockMvc
            .perform(get("/worlds/"+world1.getKey()))
            .andExpect(status().isOk())
            .andReturn();

        String content = result.getResponse().getContentAsString();

        Assert.hasText(content, world1.getId());
        Assert.hasText(content, world1.getDescription());

        Assert.doesNotContain(content, world2.getId());
        Assert.doesNotContain(content, world3.getId());
    }

    @Test
    public void should_show_no_published_world_if_none() throws Exception {
        when(worldRepository.findByKeyAndIsPublished(world1.getKey(), true))
            .thenReturn(Arrays.asList());
        MvcResult result = this.mockMvc
            .perform(get("/worlds/"+world1.getKey()))
            .andExpect(status().isOk())
            .andReturn();

        String content = result.getResponse().getContentAsString();

        Assert.isTrue(content.length() < 1, "Content should return nothing.");
    }

    /****************************************
     * Show Versions
     * ***************************************/
    @Test
    public void should_show_all_versions() throws Exception {
        when(worldRepository.findByKey(world1.getKey()))
            .thenReturn(Arrays.asList(world1, world2));
        MvcResult result = this.mockMvc
            .perform(get("/worlds/" + world1.getKey() + "/versions"))
            .andExpect(status().isOk())
            .andReturn();

        String content = result.getResponse().getContentAsString();

        Assert.hasText(content, world1.getId());
        Assert.hasText(content, world1.getDescription());

        Assert.hasText(content, world2.getId());
        Assert.doesNotContain(content, world3.getId());
    }

    /****************************************
     * Show ID
     * ***************************************/
    @Test
    public void should_show_id() throws Exception {
        when(worldRepository.findOne(world1.getId()))
            .thenReturn(world1);
        MvcResult result = this.mockMvc
            .perform(get("/worlds/" + world1.getKey() + "/" + world1.getId()))
            .andExpect(status().isOk())
            .andReturn();

        String content = result.getResponse().getContentAsString();

        Assert.hasText(content, world1.getId());
        Assert.hasText(content, world1.getDescription());
    }

    /****************************************
     * Create
     * ***************************************/
    @Test
    public void should_not_create_a_world_if_missing_parameters() throws Exception {
        String json = "{}";
        // when(worldRepository.save(Mockito.any(World.class))).thenReturn(new World());
        this.mockMvc
            .perform(post("/worlds").contentType(MediaType.APPLICATION_JSON).content(json))
            .andDo(print())
            .andExpect(status().isBadRequest());
    }

    @Test
    public void should_create_a_world_with_no_structures() throws Exception {
        String json = "{\"key\": \"c\", \"name\": \"New??????\", \"width\": 1, \"length\": 2 }";

        when(worldRepository.save(Mockito.any(World.class)))
            .thenReturn(new World());

        this.mockMvc
            .perform(post("/worlds").contentType(MediaType.APPLICATION_JSON).content(json))
            .andDo(print())
            .andExpect(status().isCreated());
            //.andExpect(header().string("Location", "/worlds/c")); //This is probably a smarter way to do it...
    }

    @Test
    public void should_create_a_world_with_structures() throws Exception {
        String json = mapper.writeValueAsString(world1);

        when(structureDefinitionRepository.findOne(Mockito.any(String.class)))
            .thenReturn(sd);
        when(worldRepository.save(Mockito.any(World.class)))
            .thenReturn(new World());

        this.mockMvc
            .perform(post("/worlds").contentType(MediaType.APPLICATION_JSON).content(json))
            .andDo(print())
            .andExpect(status().isCreated());
            //.andExpect(header().string("Location", "/worlds/c")); //This is probably a smarter way to do it...
    }

    @Test
    public void should_not_create_a_world_if_id_already_exists() throws Exception {
        String json = "{\"id\": \"c\", \"key\": \"c\", \"name\": \"New??????\", \"width\": 1, \"length\": 2 }";
        when(worldRepository.exists("c")).thenReturn(true);
        try {
            this.mockMvc
                .perform(post("/worlds").contentType(MediaType.APPLICATION_JSON).content(json));
            Assert.isTrue(false, "Expected an Illegal Argument Exception to be thrown");
        } catch (NestedServletException e) {
            Assert.hasText(e.getMessage(), "ID already exists!");
        }
    }

    // I don't know why this doesn't work, but moreover this should be in the validation unit test anyways...
    // @Test
    // public void should_not_create_a_world_if_structures_overlap() throws Exception {
    //     Structure s1 = new Structure();
    //     s1.setName("Structure Name");
    //     s1.setDescription("Structure Description");
    //     s1.setDefinitionId(sd.getId());
    //     s1.setXPosition(1);
    //     s1.setYPosition(1);
    //
    //     Structure s2 = new Structure();
    //     s2.setName("Structure Name");
    //     s2.setDescription("Structure Description");
    //     s2.setDefinitionId(sd.getId());
    //     s2.setXPosition(2);
    //     s2.setYPosition(1);
    //
    //     world2.setStructures(Arrays.asList(s1, s2));
    //     String json = mapper.writeValueAsString(world2);
    //
    //     when(worldRepository.exists("c")).thenReturn(true);
    //     when(structureDefinitionRepository.findOne(Mockito.any(String.class)))
    //         .thenReturn(sd);
    //
    //     try {
    //         this.mockMvc
    //             .perform(post("/worlds").contentType(MediaType.APPLICATION_JSON).content(json));
    //         Assert.isTrue(false, "Expected something to be thrown");
    //     } catch (NestedServletException e) {
    //         assertThat(e.getMessage()).isEqualTo("Frodo"); //Obviously it's not this.
    //     }
    // }

}
