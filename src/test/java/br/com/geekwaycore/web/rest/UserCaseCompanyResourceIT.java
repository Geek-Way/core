package br.com.geekwaycore.web.rest;

import br.com.geekwaycore.GeekwaycoreApp;
import br.com.geekwaycore.domain.UserCaseCompany;
import br.com.geekwaycore.repository.UserCaseCompanyRepository;
import br.com.geekwaycore.service.UserCaseCompanyService;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link UserCaseCompanyResource} REST controller.
 */
@SpringBootTest(classes = GeekwaycoreApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class UserCaseCompanyResourceIT {

    private static final String DEFAULT_TYPE_CLONE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE_CLONE = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_SCORE = 1;
    private static final Integer UPDATED_SCORE = 2;

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final String DEFAULT_FEEDBACK = "AAAAAAAAAA";
    private static final String UPDATED_FEEDBACK = "BBBBBBBBBB";

    private static final String DEFAULT_DEV_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_DEV_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_DEV_NOTES = "AAAAAAAAAA";
    private static final String UPDATED_DEV_NOTES = "BBBBBBBBBB";

    private static final String DEFAULT_FEEDBACK_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_FEEDBACK_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_LINK_PROJECT = "AAAAAAAAAA";
    private static final String UPDATED_LINK_PROJECT = "BBBBBBBBBB";

    private static final Instant DEFAULT_DEADLINE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DEADLINE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private UserCaseCompanyRepository userCaseCompanyRepository;

    @Autowired
    private UserCaseCompanyService userCaseCompanyService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUserCaseCompanyMockMvc;

    private UserCaseCompany userCaseCompany;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserCaseCompany createEntity(EntityManager em) {
        UserCaseCompany userCaseCompany = new UserCaseCompany()
            .typeClone(DEFAULT_TYPE_CLONE)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .score(DEFAULT_SCORE)
            .content(DEFAULT_CONTENT)
            .feedback(DEFAULT_FEEDBACK)
            .devStatus(DEFAULT_DEV_STATUS)
            .devNotes(DEFAULT_DEV_NOTES)
            .feedbackStatus(DEFAULT_FEEDBACK_STATUS)
            .linkProject(DEFAULT_LINK_PROJECT)
            .deadline(DEFAULT_DEADLINE);
        return userCaseCompany;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserCaseCompany createUpdatedEntity(EntityManager em) {
        UserCaseCompany userCaseCompany = new UserCaseCompany()
            .typeClone(UPDATED_TYPE_CLONE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .score(UPDATED_SCORE)
            .content(UPDATED_CONTENT)
            .feedback(UPDATED_FEEDBACK)
            .devStatus(UPDATED_DEV_STATUS)
            .devNotes(UPDATED_DEV_NOTES)
            .feedbackStatus(UPDATED_FEEDBACK_STATUS)
            .linkProject(UPDATED_LINK_PROJECT)
            .deadline(UPDATED_DEADLINE);
        return userCaseCompany;
    }

    @BeforeEach
    public void initTest() {
        userCaseCompany = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserCaseCompany() throws Exception {
        int databaseSizeBeforeCreate = userCaseCompanyRepository.findAll().size();
        // Create the UserCaseCompany
        restUserCaseCompanyMockMvc.perform(post("/api/user-case-companies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userCaseCompany)))
            .andExpect(status().isCreated());

        // Validate the UserCaseCompany in the database
        List<UserCaseCompany> userCaseCompanyList = userCaseCompanyRepository.findAll();
        assertThat(userCaseCompanyList).hasSize(databaseSizeBeforeCreate + 1);
        UserCaseCompany testUserCaseCompany = userCaseCompanyList.get(userCaseCompanyList.size() - 1);
        assertThat(testUserCaseCompany.getTypeClone()).isEqualTo(DEFAULT_TYPE_CLONE);
        assertThat(testUserCaseCompany.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testUserCaseCompany.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testUserCaseCompany.getScore()).isEqualTo(DEFAULT_SCORE);
        assertThat(testUserCaseCompany.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testUserCaseCompany.getFeedback()).isEqualTo(DEFAULT_FEEDBACK);
        assertThat(testUserCaseCompany.getDevStatus()).isEqualTo(DEFAULT_DEV_STATUS);
        assertThat(testUserCaseCompany.getDevNotes()).isEqualTo(DEFAULT_DEV_NOTES);
        assertThat(testUserCaseCompany.getFeedbackStatus()).isEqualTo(DEFAULT_FEEDBACK_STATUS);
        assertThat(testUserCaseCompany.getLinkProject()).isEqualTo(DEFAULT_LINK_PROJECT);
        assertThat(testUserCaseCompany.getDeadline()).isEqualTo(DEFAULT_DEADLINE);
    }

    @Test
    @Transactional
    public void createUserCaseCompanyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userCaseCompanyRepository.findAll().size();

        // Create the UserCaseCompany with an existing ID
        userCaseCompany.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserCaseCompanyMockMvc.perform(post("/api/user-case-companies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userCaseCompany)))
            .andExpect(status().isBadRequest());

        // Validate the UserCaseCompany in the database
        List<UserCaseCompany> userCaseCompanyList = userCaseCompanyRepository.findAll();
        assertThat(userCaseCompanyList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = userCaseCompanyRepository.findAll().size();
        // set the field null
        userCaseCompany.setName(null);

        // Create the UserCaseCompany, which fails.


        restUserCaseCompanyMockMvc.perform(post("/api/user-case-companies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userCaseCompany)))
            .andExpect(status().isBadRequest());

        List<UserCaseCompany> userCaseCompanyList = userCaseCompanyRepository.findAll();
        assertThat(userCaseCompanyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUserCaseCompanies() throws Exception {
        // Initialize the database
        userCaseCompanyRepository.saveAndFlush(userCaseCompany);

        // Get all the userCaseCompanyList
        restUserCaseCompanyMockMvc.perform(get("/api/user-case-companies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userCaseCompany.getId().intValue())))
            .andExpect(jsonPath("$.[*].typeClone").value(hasItem(DEFAULT_TYPE_CLONE)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].score").value(hasItem(DEFAULT_SCORE)))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].feedback").value(hasItem(DEFAULT_FEEDBACK.toString())))
            .andExpect(jsonPath("$.[*].devStatus").value(hasItem(DEFAULT_DEV_STATUS)))
            .andExpect(jsonPath("$.[*].devNotes").value(hasItem(DEFAULT_DEV_NOTES.toString())))
            .andExpect(jsonPath("$.[*].feedbackStatus").value(hasItem(DEFAULT_FEEDBACK_STATUS)))
            .andExpect(jsonPath("$.[*].linkProject").value(hasItem(DEFAULT_LINK_PROJECT)))
            .andExpect(jsonPath("$.[*].deadline").value(hasItem(DEFAULT_DEADLINE.toString())));
    }
    
    @Test
    @Transactional
    public void getUserCaseCompany() throws Exception {
        // Initialize the database
        userCaseCompanyRepository.saveAndFlush(userCaseCompany);

        // Get the userCaseCompany
        restUserCaseCompanyMockMvc.perform(get("/api/user-case-companies/{id}", userCaseCompany.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(userCaseCompany.getId().intValue()))
            .andExpect(jsonPath("$.typeClone").value(DEFAULT_TYPE_CLONE))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.score").value(DEFAULT_SCORE))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.feedback").value(DEFAULT_FEEDBACK.toString()))
            .andExpect(jsonPath("$.devStatus").value(DEFAULT_DEV_STATUS))
            .andExpect(jsonPath("$.devNotes").value(DEFAULT_DEV_NOTES.toString()))
            .andExpect(jsonPath("$.feedbackStatus").value(DEFAULT_FEEDBACK_STATUS))
            .andExpect(jsonPath("$.linkProject").value(DEFAULT_LINK_PROJECT))
            .andExpect(jsonPath("$.deadline").value(DEFAULT_DEADLINE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingUserCaseCompany() throws Exception {
        // Get the userCaseCompany
        restUserCaseCompanyMockMvc.perform(get("/api/user-case-companies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserCaseCompany() throws Exception {
        // Initialize the database
        userCaseCompanyService.save(userCaseCompany);

        int databaseSizeBeforeUpdate = userCaseCompanyRepository.findAll().size();

        // Update the userCaseCompany
        UserCaseCompany updatedUserCaseCompany = userCaseCompanyRepository.findById(userCaseCompany.getId()).get();
        // Disconnect from session so that the updates on updatedUserCaseCompany are not directly saved in db
        em.detach(updatedUserCaseCompany);
        updatedUserCaseCompany
            .typeClone(UPDATED_TYPE_CLONE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .score(UPDATED_SCORE)
            .content(UPDATED_CONTENT)
            .feedback(UPDATED_FEEDBACK)
            .devStatus(UPDATED_DEV_STATUS)
            .devNotes(UPDATED_DEV_NOTES)
            .feedbackStatus(UPDATED_FEEDBACK_STATUS)
            .linkProject(UPDATED_LINK_PROJECT)
            .deadline(UPDATED_DEADLINE);

        restUserCaseCompanyMockMvc.perform(put("/api/user-case-companies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserCaseCompany)))
            .andExpect(status().isOk());

        // Validate the UserCaseCompany in the database
        List<UserCaseCompany> userCaseCompanyList = userCaseCompanyRepository.findAll();
        assertThat(userCaseCompanyList).hasSize(databaseSizeBeforeUpdate);
        UserCaseCompany testUserCaseCompany = userCaseCompanyList.get(userCaseCompanyList.size() - 1);
        assertThat(testUserCaseCompany.getTypeClone()).isEqualTo(UPDATED_TYPE_CLONE);
        assertThat(testUserCaseCompany.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testUserCaseCompany.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testUserCaseCompany.getScore()).isEqualTo(UPDATED_SCORE);
        assertThat(testUserCaseCompany.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testUserCaseCompany.getFeedback()).isEqualTo(UPDATED_FEEDBACK);
        assertThat(testUserCaseCompany.getDevStatus()).isEqualTo(UPDATED_DEV_STATUS);
        assertThat(testUserCaseCompany.getDevNotes()).isEqualTo(UPDATED_DEV_NOTES);
        assertThat(testUserCaseCompany.getFeedbackStatus()).isEqualTo(UPDATED_FEEDBACK_STATUS);
        assertThat(testUserCaseCompany.getLinkProject()).isEqualTo(UPDATED_LINK_PROJECT);
        assertThat(testUserCaseCompany.getDeadline()).isEqualTo(UPDATED_DEADLINE);
    }

    @Test
    @Transactional
    public void updateNonExistingUserCaseCompany() throws Exception {
        int databaseSizeBeforeUpdate = userCaseCompanyRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserCaseCompanyMockMvc.perform(put("/api/user-case-companies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userCaseCompany)))
            .andExpect(status().isBadRequest());

        // Validate the UserCaseCompany in the database
        List<UserCaseCompany> userCaseCompanyList = userCaseCompanyRepository.findAll();
        assertThat(userCaseCompanyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserCaseCompany() throws Exception {
        // Initialize the database
        userCaseCompanyService.save(userCaseCompany);

        int databaseSizeBeforeDelete = userCaseCompanyRepository.findAll().size();

        // Delete the userCaseCompany
        restUserCaseCompanyMockMvc.perform(delete("/api/user-case-companies/{id}", userCaseCompany.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserCaseCompany> userCaseCompanyList = userCaseCompanyRepository.findAll();
        assertThat(userCaseCompanyList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
