package br.com.geekwaycore.web.rest;

import br.com.geekwaycore.domain.Carrer;
import br.com.geekwaycore.service.CarrerService;
import br.com.geekwaycore.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link br.com.geekwaycore.domain.Carrer}.
 */
@RestController
@RequestMapping("/api")
public class CarrerResource {

    private final Logger log = LoggerFactory.getLogger(CarrerResource.class);

    private static final String ENTITY_NAME = "carrer";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CarrerService carrerService;

    public CarrerResource(CarrerService carrerService) {
        this.carrerService = carrerService;
    }

    /**
     * {@code POST  /carrers} : Create a new carrer.
     *
     * @param carrer the carrer to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new carrer, or with status {@code 400 (Bad Request)} if the carrer has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/carrers")
    public ResponseEntity<Carrer> createCarrer(@Valid @RequestBody Carrer carrer) throws URISyntaxException {
        log.debug("REST request to save Carrer : {}", carrer);
        if (carrer.getId() != null) {
            throw new BadRequestAlertException("A new carrer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Carrer result = carrerService.save(carrer);
        return ResponseEntity.created(new URI("/api/carrers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /carrers} : Updates an existing carrer.
     *
     * @param carrer the carrer to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated carrer,
     * or with status {@code 400 (Bad Request)} if the carrer is not valid,
     * or with status {@code 500 (Internal Server Error)} if the carrer couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/carrers")
    public ResponseEntity<Carrer> updateCarrer(@Valid @RequestBody Carrer carrer) throws URISyntaxException {
        log.debug("REST request to update Carrer : {}", carrer);
        if (carrer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Carrer result = carrerService.save(carrer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, carrer.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /carrers} : get all the carrers.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of carrers in body.
     */
    @GetMapping("/carrers")
    public ResponseEntity<List<Carrer>> getAllCarrers(Pageable pageable) {
        log.debug("REST request to get a page of Carrers");
        Page<Carrer> page = carrerService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /carrers/:id} : get the "id" carrer.
     *
     * @param id the id of the carrer to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the carrer, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/carrers/{id}")
    public ResponseEntity<Carrer> getCarrer(@PathVariable Long id) {
        log.debug("REST request to get Carrer : {}", id);
        Optional<Carrer> carrer = carrerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(carrer);
    }

    /**
     * {@code DELETE  /carrers/:id} : delete the "id" carrer.
     *
     * @param id the id of the carrer to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/carrers/{id}")
    public ResponseEntity<Void> deleteCarrer(@PathVariable Long id) {
        log.debug("REST request to delete Carrer : {}", id);
        carrerService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
