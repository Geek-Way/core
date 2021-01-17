package br.com.geekwaycore.repository;

import br.com.geekwaycore.domain.VocationalTest;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the VocationalTest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VocationalTestRepository extends JpaRepository<VocationalTest, Long> {
}
