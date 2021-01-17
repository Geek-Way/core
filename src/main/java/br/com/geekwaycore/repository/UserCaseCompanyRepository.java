package br.com.geekwaycore.repository;

import br.com.geekwaycore.domain.UserCaseCompany;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the UserCaseCompany entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserCaseCompanyRepository extends JpaRepository<UserCaseCompany, Long> {

    @Query("select userCaseCompany from UserCaseCompany userCaseCompany where userCaseCompany.user.login = ?#{principal.username}")
    List<UserCaseCompany> findByUserIsCurrentUser();
}
