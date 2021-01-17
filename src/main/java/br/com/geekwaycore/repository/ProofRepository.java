package br.com.geekwaycore.repository;

import br.com.geekwaycore.domain.Proof;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Proof entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProofRepository extends JpaRepository<Proof, Long> {
}
