package br.com.geekwaycore.web.rest;

import br.com.geekwaycore.domain.VocationalTest;
import br.com.geekwaycore.service.VocationalTestService;
import br.com.geekwaycore.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link br.com.geekwaycore.domain.VocationalTest}.
 */
@RestController
@RequestMapping("/api")
public class VocationalTestResource {

    private final Logger log = LoggerFactory.getLogger(VocationalTestResource.class);

    private static final String ENTITY_NAME = "vocationalTest";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VocationalTestService vocationalTestService;

    public VocationalTestResource(VocationalTestService vocationalTestService) {
        this.vocationalTestService = vocationalTestService;
    }

    /**
     * {@code POST  /vocational-tests} : Create a new vocationalTest.
     *
     * @param vocationalTest the vocationalTest to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new vocationalTest, or with status {@code 400 (Bad Request)} if the vocationalTest has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/vocational-tests")
    public ResponseEntity<VocationalTest> createVocationalTest(@Valid @RequestBody VocationalTest vocationalTest) throws URISyntaxException {
        log.debug("REST request to save VocationalTest : {}", vocationalTest);
        if (vocationalTest.getId() != null) {
            throw new BadRequestAlertException("A new vocationalTest cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VocationalTest result = vocationalTestService.save(vocationalTest);
        return ResponseEntity.created(new URI("/api/vocational-tests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /vocational-tests} : Updates an existing vocationalTest.
     *
     * @param vocationalTest the vocationalTest to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated vocationalTest,
     * or with status {@code 400 (Bad Request)} if the vocationalTest is not valid,
     * or with status {@code 500 (Internal Server Error)} if the vocationalTest couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/vocational-tests")
    public ResponseEntity<VocationalTest> updateVocationalTest(@Valid @RequestBody VocationalTest vocationalTest) throws URISyntaxException {
        log.debug("REST request to update VocationalTest : {}", vocationalTest);
        if (vocationalTest.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        VocationalTest result = vocationalTestService.save(vocationalTest);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, vocationalTest.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /vocational-tests} : get all the vocationalTests.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of vocationalTests in body.
     */
    @GetMapping("/vocational-tests")
    public List<VocationalTest> getAllVocationalTests() {
        log.debug("REST request to get all VocationalTests");
        return vocationalTestService.findAll();
    }

    /**
     * {@code GET  /vocational-tests/:id} : get the "id" vocationalTest.
     *
     * @param id the id of the vocationalTest to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the vocationalTest, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/vocational-tests/{id}")
    public ResponseEntity<VocationalTest> getVocationalTest(@PathVariable Long id) {
        log.debug("REST request to get VocationalTest : {}", id);
        Optional<VocationalTest> vocationalTest = vocationalTestService.findOne(id);
        return ResponseUtil.wrapOrNotFound(vocationalTest);
    }

    /**
     * {@code DELETE  /vocational-tests/:id} : delete the "id" vocationalTest.
     *
     * @param id the id of the vocationalTest to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/vocational-tests/{id}")
    public ResponseEntity<Void> deleteVocationalTest(@PathVariable Long id) {
        log.debug("REST request to delete VocationalTest : {}", id);
        vocationalTestService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
