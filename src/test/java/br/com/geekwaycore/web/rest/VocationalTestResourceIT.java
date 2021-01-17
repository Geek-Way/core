package br.com.geekwaycore.web.rest;

import br.com.geekwaycore.GeekwaycoreApp;
import br.com.geekwaycore.domain.VocationalTest;
import br.com.geekwaycore.repository.VocationalTestRepository;
import br.com.geekwaycore.service.VocationalTestService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link VocationalTestResource} REST controller.
 */
@SpringBootTest(classes = GeekwaycoreApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class VocationalTestResourceIT {

    private static final String DEFAULT_TYPE_CLONE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE_CLONE = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_CARRER = "AAAAAAAAAA";
    private static final String UPDATED_CARRER = "BBBBBBBBBB";

    @Autowired
    private VocationalTestRepository vocationalTestRepository;

    @Autowired
    private VocationalTestService vocationalTestService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVocationalTestMockMvc;

    private VocationalTest vocationalTest;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VocationalTest createEntity(EntityManager em) {
        VocationalTest vocationalTest = new VocationalTest()
            .typeClone(DEFAULT_TYPE_CLONE)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .status(DEFAULT_STATUS)
            .carrer(DEFAULT_CARRER);
        return vocationalTest;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VocationalTest createUpdatedEntity(EntityManager em) {
        VocationalTest vocationalTest = new VocationalTest()
            .typeClone(UPDATED_TYPE_CLONE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .status(UPDATED_STATUS)
            .carrer(UPDATED_CARRER);
        return vocationalTest;
    }

    @BeforeEach
    public void initTest() {
        vocationalTest = createEntity(em);
    }

    @Test
    @Transactional
    public void createVocationalTest() throws Exception {
        int databaseSizeBeforeCreate = vocationalTestRepository.findAll().size();
        // Create the VocationalTest
        restVocationalTestMockMvc.perform(post("/api/vocational-tests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vocationalTest)))
            .andExpect(status().isCreated());

        // Validate the VocationalTest in the database
        List<VocationalTest> vocationalTestList = vocationalTestRepository.findAll();
        assertThat(vocationalTestList).hasSize(databaseSizeBeforeCreate + 1);
        VocationalTest testVocationalTest = vocationalTestList.get(vocationalTestList.size() - 1);
        assertThat(testVocationalTest.getTypeClone()).isEqualTo(DEFAULT_TYPE_CLONE);
        assertThat(testVocationalTest.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testVocationalTest.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testVocationalTest.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testVocationalTest.getCarrer()).isEqualTo(DEFAULT_CARRER);
    }

    @Test
    @Transactional
    public void createVocationalTestWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = vocationalTestRepository.findAll().size();

        // Create the VocationalTest with an existing ID
        vocationalTest.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVocationalTestMockMvc.perform(post("/api/vocational-tests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vocationalTest)))
            .andExpect(status().isBadRequest());

        // Validate the VocationalTest in the database
        List<VocationalTest> vocationalTestList = vocationalTestRepository.findAll();
        assertThat(vocationalTestList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = vocationalTestRepository.findAll().size();
        // set the field null
        vocationalTest.setName(null);

        // Create the VocationalTest, which fails.


        restVocationalTestMockMvc.perform(post("/api/vocational-tests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vocationalTest)))
            .andExpect(status().isBadRequest());

        List<VocationalTest> vocationalTestList = vocationalTestRepository.findAll();
        assertThat(vocationalTestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVocationalTests() throws Exception {
        // Initialize the database
        vocationalTestRepository.saveAndFlush(vocationalTest);

        // Get all the vocationalTestList
        restVocationalTestMockMvc.perform(get("/api/vocational-tests?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vocationalTest.getId().intValue())))
            .andExpect(jsonPath("$.[*].typeClone").value(hasItem(DEFAULT_TYPE_CLONE)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].carrer").value(hasItem(DEFAULT_CARRER)));
    }
    
    @Test
    @Transactional
    public void getVocationalTest() throws Exception {
        // Initialize the database
        vocationalTestRepository.saveAndFlush(vocationalTest);

        // Get the vocationalTest
        restVocationalTestMockMvc.perform(get("/api/vocational-tests/{id}", vocationalTest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(vocationalTest.getId().intValue()))
            .andExpect(jsonPath("$.typeClone").value(DEFAULT_TYPE_CLONE))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS))
            .andExpect(jsonPath("$.carrer").value(DEFAULT_CARRER));
    }
    @Test
    @Transactional
    public void getNonExistingVocationalTest() throws Exception {
        // Get the vocationalTest
        restVocationalTestMockMvc.perform(get("/api/vocational-tests/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVocationalTest() throws Exception {
        // Initialize the database
        vocationalTestService.save(vocationalTest);

        int databaseSizeBeforeUpdate = vocationalTestRepository.findAll().size();

        // Update the vocationalTest
        VocationalTest updatedVocationalTest = vocationalTestRepository.findById(vocationalTest.getId()).get();
        // Disconnect from session so that the updates on updatedVocationalTest are not directly saved in db
        em.detach(updatedVocationalTest);
        updatedVocationalTest
            .typeClone(UPDATED_TYPE_CLONE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .status(UPDATED_STATUS)
            .carrer(UPDATED_CARRER);

        restVocationalTestMockMvc.perform(put("/api/vocational-tests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedVocationalTest)))
            .andExpect(status().isOk());

        // Validate the VocationalTest in the database
        List<VocationalTest> vocationalTestList = vocationalTestRepository.findAll();
        assertThat(vocationalTestList).hasSize(databaseSizeBeforeUpdate);
        VocationalTest testVocationalTest = vocationalTestList.get(vocationalTestList.size() - 1);
        assertThat(testVocationalTest.getTypeClone()).isEqualTo(UPDATED_TYPE_CLONE);
        assertThat(testVocationalTest.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testVocationalTest.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testVocationalTest.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testVocationalTest.getCarrer()).isEqualTo(UPDATED_CARRER);
    }

    @Test
    @Transactional
    public void updateNonExistingVocationalTest() throws Exception {
        int databaseSizeBeforeUpdate = vocationalTestRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVocationalTestMockMvc.perform(put("/api/vocational-tests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vocationalTest)))
            .andExpect(status().isBadRequest());

        // Validate the VocationalTest in the database
        List<VocationalTest> vocationalTestList = vocationalTestRepository.findAll();
        assertThat(vocationalTestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVocationalTest() throws Exception {
        // Initialize the database
        vocationalTestService.save(vocationalTest);

        int databaseSizeBeforeDelete = vocationalTestRepository.findAll().size();

        // Delete the vocationalTest
        restVocationalTestMockMvc.perform(delete("/api/vocational-tests/{id}", vocationalTest.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<VocationalTest> vocationalTestList = vocationalTestRepository.findAll();
        assertThat(vocationalTestList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
