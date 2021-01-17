package br.com.geekwaycore.service;

import br.com.geekwaycore.domain.Carrer;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Carrer}.
 */
public interface CarrerService {

    /**
     * Save a carrer.
     *
     * @param carrer the entity to save.
     * @return the persisted entity.
     */
    Carrer save(Carrer carrer);

    /**
     * Get all the carrers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Carrer> findAll(Pageable pageable);


    /**
     * Get the "id" carrer.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Carrer> findOne(Long id);

    /**
     * Delete the "id" carrer.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
