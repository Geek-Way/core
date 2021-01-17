package br.com.geekwaycore.web.rest;

import br.com.geekwaycore.GeekwaycoreApp;
import br.com.geekwaycore.domain.Proof;
import br.com.geekwaycore.repository.ProofRepository;
import br.com.geekwaycore.service.ProofService;

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
 * Integration tests for the {@link ProofResource} REST controller.
 */
@SpringBootTest(classes = GeekwaycoreApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProofResourceIT {

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

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_QONE_QUEST = "AAAAAAAAAA";
    private static final String UPDATED_QONE_QUEST = "BBBBBBBBBB";

    private static final String DEFAULT_QONE_ASR = "AAAAAAAAAA";
    private static final String UPDATED_QONE_ASR = "BBBBBBBBBB";

    private static final String DEFAULT_QONE_OPT = "AAAAAAAAAA";
    private static final String UPDATED_QONE_OPT = "BBBBBBBBBB";

    private static final String DEFAULT_QONE_USR = "AAAAAAAAAA";
    private static final String UPDATED_QONE_USR = "BBBBBBBBBB";

    private static final String DEFAULT_QTWO_QUEST = "AAAAAAAAAA";
    private static final String UPDATED_QTWO_QUEST = "BBBBBBBBBB";

    private static final String DEFAULT_QTWO_ASR = "AAAAAAAAAA";
    private static final String UPDATED_QTWO_ASR = "BBBBBBBBBB";

    private static final String DEFAULT_QTWO_OPT = "AAAAAAAAAA";
    private static final String UPDATED_QTWO_OPT = "BBBBBBBBBB";

    private static final String DEFAULT_QTWO_USR = "AAAAAAAAAA";
    private static final String UPDATED_QTWO_USR = "BBBBBBBBBB";

    private static final String DEFAULT_QTRE_QUEST = "AAAAAAAAAA";
    private static final String UPDATED_QTRE_QUEST = "BBBBBBBBBB";

    private static final String DEFAULT_QTRE_ASR = "AAAAAAAAAA";
    private static final String UPDATED_QTRE_ASR = "BBBBBBBBBB";

    private static final String DEFAULT_QTRE_OPT = "AAAAAAAAAA";
    private static final String UPDATED_QTRE_OPT = "BBBBBBBBBB";

    private static final String DEFAULT_QTRE_USR = "AAAAAAAAAA";
    private static final String UPDATED_QTRE_USR = "BBBBBBBBBB";

    @Autowired
    private ProofRepository proofRepository;

    @Autowired
    private ProofService proofService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProofMockMvc;

    private Proof proof;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Proof createEntity(EntityManager em) {
        Proof proof = new Proof()
            .typeClone(DEFAULT_TYPE_CLONE)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .score(DEFAULT_SCORE)
            .scoreLevel(DEFAULT_SCORE_LEVEL)
            .content(DEFAULT_CONTENT)
            .status(DEFAULT_STATUS)
            .qoneQuest(DEFAULT_QONE_QUEST)
            .qoneAsr(DEFAULT_QONE_ASR)
            .qoneOpt(DEFAULT_QONE_OPT)
            .qoneUsr(DEFAULT_QONE_USR)
            .qtwoQuest(DEFAULT_QTWO_QUEST)
            .qtwoAsr(DEFAULT_QTWO_ASR)
            .qtwoOpt(DEFAULT_QTWO_OPT)
            .qtwoUsr(DEFAULT_QTWO_USR)
            .qtreQuest(DEFAULT_QTRE_QUEST)
            .qtreAsr(DEFAULT_QTRE_ASR)
            .qtreOpt(DEFAULT_QTRE_OPT)
            .qtreUsr(DEFAULT_QTRE_USR);
        return proof;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Proof createUpdatedEntity(EntityManager em) {
        Proof proof = new Proof()
            .typeClone(UPDATED_TYPE_CLONE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .score(UPDATED_SCORE)
            .scoreLevel(UPDATED_SCORE_LEVEL)
            .content(UPDATED_CONTENT)
            .status(UPDATED_STATUS)
            .qoneQuest(UPDATED_QONE_QUEST)
            .qoneAsr(UPDATED_QONE_ASR)
            .qoneOpt(UPDATED_QONE_OPT)
            .qoneUsr(UPDATED_QONE_USR)
            .qtwoQuest(UPDATED_QTWO_QUEST)
            .qtwoAsr(UPDATED_QTWO_ASR)
            .qtwoOpt(UPDATED_QTWO_OPT)
            .qtwoUsr(UPDATED_QTWO_USR)
            .qtreQuest(UPDATED_QTRE_QUEST)
            .qtreAsr(UPDATED_QTRE_ASR)
            .qtreOpt(UPDATED_QTRE_OPT)
            .qtreUsr(UPDATED_QTRE_USR);
        return proof;
    }

    @BeforeEach
    public void initTest() {
        proof = createEntity(em);
    }

    @Test
    @Transactional
    public void createProof() throws Exception {
        int databaseSizeBeforeCreate = proofRepository.findAll().size();
        // Create the Proof
        restProofMockMvc.perform(post("/api/proofs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(proof)))
            .andExpect(status().isCreated());

        // Validate the Proof in the database
        List<Proof> proofList = proofRepository.findAll();
        assertThat(proofList).hasSize(databaseSizeBeforeCreate + 1);
        Proof testProof = proofList.get(proofList.size() - 1);
        assertThat(testProof.getTypeClone()).isEqualTo(DEFAULT_TYPE_CLONE);
        assertThat(testProof.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testProof.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testProof.getScore()).isEqualTo(DEFAULT_SCORE);
        assertThat(testProof.getScoreLevel()).isEqualTo(DEFAULT_SCORE_LEVEL);
        assertThat(testProof.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testProof.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testProof.getQoneQuest()).isEqualTo(DEFAULT_QONE_QUEST);
        assertThat(testProof.getQoneAsr()).isEqualTo(DEFAULT_QONE_ASR);
        assertThat(testProof.getQoneOpt()).isEqualTo(DEFAULT_QONE_OPT);
        assertThat(testProof.getQoneUsr()).isEqualTo(DEFAULT_QONE_USR);
        assertThat(testProof.getQtwoQuest()).isEqualTo(DEFAULT_QTWO_QUEST);
        assertThat(testProof.getQtwoAsr()).isEqualTo(DEFAULT_QTWO_ASR);
        assertThat(testProof.getQtwoOpt()).isEqualTo(DEFAULT_QTWO_OPT);
        assertThat(testProof.getQtwoUsr()).isEqualTo(DEFAULT_QTWO_USR);
        assertThat(testProof.getQtreQuest()).isEqualTo(DEFAULT_QTRE_QUEST);
        assertThat(testProof.getQtreAsr()).isEqualTo(DEFAULT_QTRE_ASR);
        assertThat(testProof.getQtreOpt()).isEqualTo(DEFAULT_QTRE_OPT);
        assertThat(testProof.getQtreUsr()).isEqualTo(DEFAULT_QTRE_USR);
    }

    @Test
    @Transactional
    public void createProofWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = proofRepository.findAll().size();

        // Create the Proof with an existing ID
        proof.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProofMockMvc.perform(post("/api/proofs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(proof)))
            .andExpect(status().isBadRequest());

        // Validate the Proof in the database
        List<Proof> proofList = proofRepository.findAll();
        assertThat(proofList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = proofRepository.findAll().size();
        // set the field null
        proof.setName(null);

        // Create the Proof, which fails.


        restProofMockMvc.perform(post("/api/proofs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(proof)))
            .andExpect(status().isBadRequest());

        List<Proof> proofList = proofRepository.findAll();
        assertThat(proofList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProofs() throws Exception {
        // Initialize the database
        proofRepository.saveAndFlush(proof);

        // Get all the proofList
        restProofMockMvc.perform(get("/api/proofs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(proof.getId().intValue())))
            .andExpect(jsonPath("$.[*].typeClone").value(hasItem(DEFAULT_TYPE_CLONE)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].score").value(hasItem(DEFAULT_SCORE)))
            .andExpect(jsonPath("$.[*].scoreLevel").value(hasItem(DEFAULT_SCORE_LEVEL)))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].qoneQuest").value(hasItem(DEFAULT_QONE_QUEST)))
            .andExpect(jsonPath("$.[*].qoneAsr").value(hasItem(DEFAULT_QONE_ASR)))
            .andExpect(jsonPath("$.[*].qoneOpt").value(hasItem(DEFAULT_QONE_OPT)))
            .andExpect(jsonPath("$.[*].qoneUsr").value(hasItem(DEFAULT_QONE_USR)))
            .andExpect(jsonPath("$.[*].qtwoQuest").value(hasItem(DEFAULT_QTWO_QUEST)))
            .andExpect(jsonPath("$.[*].qtwoAsr").value(hasItem(DEFAULT_QTWO_ASR)))
            .andExpect(jsonPath("$.[*].qtwoOpt").value(hasItem(DEFAULT_QTWO_OPT)))
            .andExpect(jsonPath("$.[*].qtwoUsr").value(hasItem(DEFAULT_QTWO_USR)))
            .andExpect(jsonPath("$.[*].qtreQuest").value(hasItem(DEFAULT_QTRE_QUEST)))
            .andExpect(jsonPath("$.[*].qtreAsr").value(hasItem(DEFAULT_QTRE_ASR)))
            .andExpect(jsonPath("$.[*].qtreOpt").value(hasItem(DEFAULT_QTRE_OPT)))
            .andExpect(jsonPath("$.[*].qtreUsr").value(hasItem(DEFAULT_QTRE_USR)));
    }
    
    @Test
    @Transactional
    public void getProof() throws Exception {
        // Initialize the database
        proofRepository.saveAndFlush(proof);

        // Get the proof
        restProofMockMvc.perform(get("/api/proofs/{id}", proof.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(proof.getId().intValue()))
            .andExpect(jsonPath("$.typeClone").value(DEFAULT_TYPE_CLONE))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.score").value(DEFAULT_SCORE))
            .andExpect(jsonPath("$.scoreLevel").value(DEFAULT_SCORE_LEVEL))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS))
            .andExpect(jsonPath("$.qoneQuest").value(DEFAULT_QONE_QUEST))
            .andExpect(jsonPath("$.qoneAsr").value(DEFAULT_QONE_ASR))
            .andExpect(jsonPath("$.qoneOpt").value(DEFAULT_QONE_OPT))
            .andExpect(jsonPath("$.qoneUsr").value(DEFAULT_QONE_USR))
            .andExpect(jsonPath("$.qtwoQuest").value(DEFAULT_QTWO_QUEST))
            .andExpect(jsonPath("$.qtwoAsr").value(DEFAULT_QTWO_ASR))
            .andExpect(jsonPath("$.qtwoOpt").value(DEFAULT_QTWO_OPT))
            .andExpect(jsonPath("$.qtwoUsr").value(DEFAULT_QTWO_USR))
            .andExpect(jsonPath("$.qtreQuest").value(DEFAULT_QTRE_QUEST))
            .andExpect(jsonPath("$.qtreAsr").value(DEFAULT_QTRE_ASR))
            .andExpect(jsonPath("$.qtreOpt").value(DEFAULT_QTRE_OPT))
            .andExpect(jsonPath("$.qtreUsr").value(DEFAULT_QTRE_USR));
    }
    @Test
    @Transactional
    public void getNonExistingProof() throws Exception {
        // Get the proof
        restProofMockMvc.perform(get("/api/proofs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProof() throws Exception {
        // Initialize the database
        proofService.save(proof);

        int databaseSizeBeforeUpdate = proofRepository.findAll().size();

        // Update the proof
        Proof updatedProof = proofRepository.findById(proof.getId()).get();
        // Disconnect from session so that the updates on updatedProof are not directly saved in db
        em.detach(updatedProof);
        updatedProof
            .typeClone(UPDATED_TYPE_CLONE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .score(UPDATED_SCORE)
            .scoreLevel(UPDATED_SCORE_LEVEL)
            .content(UPDATED_CONTENT)
            .status(UPDATED_STATUS)
            .qoneQuest(UPDATED_QONE_QUEST)
            .qoneAsr(UPDATED_QONE_ASR)
            .qoneOpt(UPDATED_QONE_OPT)
            .qoneUsr(UPDATED_QONE_USR)
            .qtwoQuest(UPDATED_QTWO_QUEST)
            .qtwoAsr(UPDATED_QTWO_ASR)
            .qtwoOpt(UPDATED_QTWO_OPT)
            .qtwoUsr(UPDATED_QTWO_USR)
            .qtreQuest(UPDATED_QTRE_QUEST)
            .qtreAsr(UPDATED_QTRE_ASR)
            .qtreOpt(UPDATED_QTRE_OPT)
            .qtreUsr(UPDATED_QTRE_USR);

        restProofMockMvc.perform(put("/api/proofs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProof)))
            .andExpect(status().isOk());

        // Validate the Proof in the database
        List<Proof> proofList = proofRepository.findAll();
        assertThat(proofList).hasSize(databaseSizeBeforeUpdate);
        Proof testProof = proofList.get(proofList.size() - 1);
        assertThat(testProof.getTypeClone()).isEqualTo(UPDATED_TYPE_CLONE);
        assertThat(testProof.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testProof.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testProof.getScore()).isEqualTo(UPDATED_SCORE);
        assertThat(testProof.getScoreLevel()).isEqualTo(UPDATED_SCORE_LEVEL);
        assertThat(testProof.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testProof.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testProof.getQoneQuest()).isEqualTo(UPDATED_QONE_QUEST);
        assertThat(testProof.getQoneAsr()).isEqualTo(UPDATED_QONE_ASR);
        assertThat(testProof.getQoneOpt()).isEqualTo(UPDATED_QONE_OPT);
        assertThat(testProof.getQoneUsr()).isEqualTo(UPDATED_QONE_USR);
        assertThat(testProof.getQtwoQuest()).isEqualTo(UPDATED_QTWO_QUEST);
        assertThat(testProof.getQtwoAsr()).isEqualTo(UPDATED_QTWO_ASR);
        assertThat(testProof.getQtwoOpt()).isEqualTo(UPDATED_QTWO_OPT);
        assertThat(testProof.getQtwoUsr()).isEqualTo(UPDATED_QTWO_USR);
        assertThat(testProof.getQtreQuest()).isEqualTo(UPDATED_QTRE_QUEST);
        assertThat(testProof.getQtreAsr()).isEqualTo(UPDATED_QTRE_ASR);
        assertThat(testProof.getQtreOpt()).isEqualTo(UPDATED_QTRE_OPT);
        assertThat(testProof.getQtreUsr()).isEqualTo(UPDATED_QTRE_USR);
    }

    @Test
    @Transactional
    public void updateNonExistingProof() throws Exception {
        int databaseSizeBeforeUpdate = proofRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProofMockMvc.perform(put("/api/proofs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(proof)))
            .andExpect(status().isBadRequest());

        // Validate the Proof in the database
        List<Proof> proofList = proofRepository.findAll();
        assertThat(proofList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProof() throws Exception {
        // Initialize the database
        proofService.save(proof);

        int databaseSizeBeforeDelete = proofRepository.findAll().size();

        // Delete the proof
        restProofMockMvc.perform(delete("/api/proofs/{id}", proof.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Proof> proofList = proofRepository.findAll();
        assertThat(proofList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
