package br.com.geekwaycore.web.rest;

import br.com.geekwaycore.domain.UserCaseCompany;
import br.com.geekwaycore.service.UserCaseCompanyService;
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
 * REST controller for managing {@link br.com.geekwaycore.domain.UserCaseCompany}.
 */
@RestController
@RequestMapping("/api")
public class UserCaseCompanyResource {

    private final Logger log = LoggerFactory.getLogger(UserCaseCompanyResource.class);

    private static final String ENTITY_NAME = "userCaseCompany";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserCaseCompanyService userCaseCompanyService;

    public UserCaseCompanyResource(UserCaseCompanyService userCaseCompanyService) {
        this.userCaseCompanyService = userCaseCompanyService;
    }

    /**
     * {@code POST  /user-case-companies} : Create a new userCaseCompany.
     *
     * @param userCaseCompany the userCaseCompany to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userCaseCompany, or with status {@code 400 (Bad Request)} if the userCaseCompany has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-case-companies")
    public ResponseEntity<UserCaseCompany> createUserCaseCompany(@Valid @RequestBody UserCaseCompany userCaseCompany) throws URISyntaxException {
        log.debug("REST request to save UserCaseCompany : {}", userCaseCompany);
        if (userCaseCompany.getId() != null) {
            throw new BadRequestAlertException("A new userCaseCompany cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserCaseCompany result = userCaseCompanyService.save(userCaseCompany);
        return ResponseEntity.created(new URI("/api/user-case-companies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-case-companies} : Updates an existing userCaseCompany.
     *
     * @param userCaseCompany the userCaseCompany to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userCaseCompany,
     * or with status {@code 400 (Bad Request)} if the userCaseCompany is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userCaseCompany couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-case-companies")
    public ResponseEntity<UserCaseCompany> updateUserCaseCompany(@Valid @RequestBody UserCaseCompany userCaseCompany) throws URISyntaxException {
        log.debug("REST request to update UserCaseCompany : {}", userCaseCompany);
        if (userCaseCompany.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserCaseCompany result = userCaseCompanyService.save(userCaseCompany);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userCaseCompany.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /user-case-companies} : get all the userCaseCompanies.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userCaseCompanies in body.
     */
    @GetMapping("/user-case-companies")
    public List<UserCaseCompany> getAllUserCaseCompanies() {
        log.debug("REST request to get all UserCaseCompanies");
        return userCaseCompanyService.findAll();
    }

    /**
     * {@code GET  /user-case-companies/:id} : get the "id" userCaseCompany.
     *
     * @param id the id of the userCaseCompany to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userCaseCompany, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-case-companies/{id}")
    public ResponseEntity<UserCaseCompany> getUserCaseCompany(@PathVariable Long id) {
        log.debug("REST request to get UserCaseCompany : {}", id);
        Optional<UserCaseCompany> userCaseCompany = userCaseCompanyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(userCaseCompany);
    }

    /**
     * {@code DELETE  /user-case-companies/:id} : delete the "id" userCaseCompany.
     *
     * @param id the id of the userCaseCompany to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-case-companies/{id}")
    public ResponseEntity<Void> deleteUserCaseCompany(@PathVariable Long id) {
        log.debug("REST request to delete UserCaseCompany : {}", id);
        userCaseCompanyService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
