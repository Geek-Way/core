package br.com.geekwaycore.service;

import br.com.geekwaycore.domain.Company;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Company}.
 */
public interface CompanyService {

    /**
     * Save a company.
     *
     * @param company the entity to save.
     * @return the persisted entity.
     */
    Company save(Company company);

    /**
     * Get all the companies.
     *
     * @return the list of entities.
     */
    List<Company> findAll();


    /**
     * Get the "id" company.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Company> findOne(Long id);

    /**
     * Delete the "id" company.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
