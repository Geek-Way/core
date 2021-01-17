package br.com.geekwaycore.service;

import br.com.geekwaycore.domain.Proof;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Proof}.
 */
public interface ProofService {

    /**
     * Save a proof.
     *
     * @param proof the entity to save.
     * @return the persisted entity.
     */
    Proof save(Proof proof);

    /**
     * Get all the proofs.
     *
     * @return the list of entities.
     */
    List<Proof> findAll();


    /**
     * Get the "id" proof.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Proof> findOne(Long id);

    /**
     * Delete the "id" proof.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
