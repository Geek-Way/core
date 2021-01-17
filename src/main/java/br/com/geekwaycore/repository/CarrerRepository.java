package br.com.geekwaycore.repository;

import br.com.geekwaycore.domain.Carrer;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Carrer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CarrerRepository extends JpaRepository<Carrer, Long> {

    @Query("select carrer from Carrer carrer where carrer.user.login = ?#{principal.username}")
    List<Carrer> findByUserIsCurrentUser();
}
