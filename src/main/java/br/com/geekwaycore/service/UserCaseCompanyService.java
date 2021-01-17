package br.com.geekwaycore.service;

import br.com.geekwaycore.domain.UserCaseCompany;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link UserCaseCompany}.
 */
public interface UserCaseCompanyService {

    /**
     * Save a userCaseCompany.
     *
     * @param userCaseCompany the entity to save.
     * @return the persisted entity.
     */
    UserCaseCompany save(UserCaseCompany userCaseCompany);

    /**
     * Get all the userCaseCompanies.
     *
     * @return the list of entities.
     */
    List<UserCaseCompany> findAll();


    /**
     * Get the "id" userCaseCompany.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<UserCaseCompany> findOne(Long id);

    /**
     * Delete the "id" userCaseCompany.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
