package br.com.geekwaycore.web.rest;

import br.com.geekwaycore.GeekwaycoreApp;
import br.com.geekwaycore.domain.Carrer;
import br.com.geekwaycore.repository.CarrerRepository;
import br.com.geekwaycore.service.CarrerService;

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
 * Integration tests for the {@link CarrerResource} REST controller.
 */
@SpringBootTest(classes = GeekwaycoreApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CarrerResourceIT {

    private static final String DEFAULT_TYPE_CLONE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE_CLONE = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_SCORE = 1;
    private static final Integer UPDATED_SCORE = 2;

    private static final String DEFAULT_SCORE_LEVEL = "AAAAAAAAAA";
    private static final String UPDATED_SCORE_LEVEL = "BBBBBBBBBB";

    @Autowired
    private CarrerRepository carrerRepository;

    @Autowired
    private CarrerService carrerService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCarrerMockMvc;

    private Carrer carrer;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Carrer createEntity(EntityManager em) {
        Carrer carrer = new Carrer()
            .typeClone(DEFAULT_TYPE_CLONE)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .score(DEFAULT_SCORE)
            .scoreLevel(DEFAULT_SCORE_LEVEL);
        return carrer;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Carrer createUpdatedEntity(EntityManager em) {
        Carrer carrer = new Carrer()
            .typeClone(UPDATED_TYPE_CLONE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .score(UPDATED_SCORE)
            .scoreLevel(UPDATED_SCORE_LEVEL);
        return carrer;
    }

    @BeforeEach
    public void initTest() {
        carrer = createEntity(em);
    }

    @Test
    @Transactional
    public void createCarrer() throws Exception {
        int databaseSizeBeforeCreate = carrerRepository.findAll().size();
        // Create the Carrer
        restCarrerMockMvc.perform(post("/api/carrers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(carrer)))
            .andExpect(status().isCreated());

        // Validate the Carrer in the database
        List<Carrer> carrerList = carrerRepository.findAll();
        assertThat(carrerList).hasSize(databaseSizeBeforeCreate + 1);
        Carrer testCarrer = carrerList.get(carrerList.size() - 1);
        assertThat(testCarrer.getTypeClone()).isEqualTo(DEFAULT_TYPE_CLONE);
        assertThat(testCarrer.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCarrer.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testCarrer.getScore()).isEqualTo(DEFAULT_SCORE);
        assertThat(testCarrer.getScoreLevel()).isEqualTo(DEFAULT_SCORE_LEVEL);
    }

    @Test
    @Transactional
    public void createCarrerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = carrerRepository.findAll().size();

        // Create the Carrer with an existing ID
        carrer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCarrerMockMvc.perform(post("/api/carrers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(carrer)))
            .andExpect(status().isBadRequest());

        // Validate the Carrer in the database
        List<Carrer> carrerList = carrerRepository.findAll();
        assertThat(carrerList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = carrerRepository.findAll().size();
        // set the field null
        carrer.setName(null);

        // Create the Carrer, which fails.


        restCarrerMockMvc.perform(post("/api/carrers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(carrer)))
            .andExpect(status().isBadRequest());

        List<Carrer> carrerList = carrerRepository.findAll();
        assertThat(carrerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCarrers() throws Exception {
        // Initialize the database
        carrerRepository.saveAndFlush(carrer);

        // Get all the carrerList
        restCarrerMockMvc.perform(get("/api/carrers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(carrer.getId().intValue())))
            .andExpect(jsonPath("$.[*].typeClone").value(hasItem(DEFAULT_TYPE_CLONE)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].score").value(hasItem(DEFAULT_SCORE)))
            .andExpect(jsonPath("$.[*].scoreLevel").value(hasItem(DEFAULT_SCORE_LEVEL)));
    }
    
    @Test
    @Transactional
    public void getCarrer() throws Exception {
        // Initialize the database
        carrerRepository.saveAndFlush(carrer);

        // Get the carrer
        restCarrerMockMvc.perform(get("/api/carrers/{id}", carrer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(carrer.getId().intValue()))
            .andExpect(jsonPath("$.typeClone").value(DEFAULT_TYPE_CLONE))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.score").value(DEFAULT_SCORE))
            .andExpect(jsonPath("$.scoreLevel").value(DEFAULT_SCORE_LEVEL));
    }
    @Test
    @Transactional
    public void getNonExistingCarrer() throws Exception {
        // Get the carrer
        restCarrerMockMvc.perform(get("/api/carrers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCarrer() throws Exception {
        // Initialize the database
        carrerService.save(carrer);

        int databaseSizeBeforeUpdate = carrerRepository.findAll().size();

        // Update the carrer
        Carrer updatedCarrer = carrerRepository.findById(carrer.getId()).get();
        // Disconnect from session so that the updates on updatedCarrer are not directly saved in db
        em.detach(updatedCarrer);
        updatedCarrer
            .typeClone(UPDATED_TYPE_CLONE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .score(UPDATED_SCORE)
            .scoreLevel(UPDATED_SCORE_LEVEL);

        restCarrerMockMvc.perform(put("/api/carrers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCarrer)))
            .andExpect(status().isOk());

        // Validate the Carrer in the database
        List<Carrer> carrerList = carrerRepository.findAll();
        assertThat(carrerList).hasSize(databaseSizeBeforeUpdate);
        Carrer testCarrer = carrerList.get(carrerList.size() - 1);
        assertThat(testCarrer.getTypeClone()).isEqualTo(UPDATED_TYPE_CLONE);
        assertThat(testCarrer.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCarrer.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testCarrer.getScore()).isEqualTo(UPDATED_SCORE);
        assertThat(testCarrer.getScoreLevel()).isEqualTo(UPDATED_SCORE_LEVEL);
    }

    @Test
    @Transactional
    public void updateNonExistingCarrer() throws Exception {
        int databaseSizeBeforeUpdate = carrerRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCarrerMockMvc.perform(put("/api/carrers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(carrer)))
            .andExpect(status().isBadRequest());

        // Validate the Carrer in the database
        List<Carrer> carrerList = carrerRepository.findAll();
        assertThat(carrerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCarrer() throws Exception {
        // Initialize the database
        carrerService.save(carrer);

        int databaseSizeBeforeDelete = carrerRepository.findAll().size();

        // Delete the carrer
        restCarrerMockMvc.perform(delete("/api/carrers/{id}", carrer.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Carrer> carrerList = carrerRepository.findAll();
        assertThat(carrerList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
