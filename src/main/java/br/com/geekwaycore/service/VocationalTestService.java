package br.com.geekwaycore.service;

import br.com.geekwaycore.domain.VocationalTest;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link VocationalTest}.
 */
public interface VocationalTestService {

    /**
     * Save a vocationalTest.
     *
     * @param vocationalTest the entity to save.
     * @return the persisted entity.
     */
    VocationalTest save(VocationalTest vocationalTest);

    /**
     * Get all the vocationalTests.
     *
     * @return the list of entities.
     */
    List<VocationalTest> findAll();


    /**
     * Get the "id" vocationalTest.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<VocationalTest> findOne(Long id);

    /**
     * Delete the "id" vocationalTest.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
