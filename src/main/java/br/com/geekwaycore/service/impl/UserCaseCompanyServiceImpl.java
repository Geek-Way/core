package br.com.geekwaycore.service.impl;

import br.com.geekwaycore.service.UserCaseCompanyService;
import br.com.geekwaycore.domain.UserCaseCompany;
import br.com.geekwaycore.repository.UserCaseCompanyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link UserCaseCompany}.
 */
@Service
@Transactional
public class UserCaseCompanyServiceImpl implements UserCaseCompanyService {

    private final Logger log = LoggerFactory.getLogger(UserCaseCompanyServiceImpl.class);

    private final UserCaseCompanyRepository userCaseCompanyRepository;

    public UserCaseCompanyServiceImpl(UserCaseCompanyRepository userCaseCompanyRepository) {
        this.userCaseCompanyRepository = userCaseCompanyRepository;
    }

    @Override
    public UserCaseCompany save(UserCaseCompany userCaseCompany) {
        log.debug("Request to save UserCaseCompany : {}", userCaseCompany);
        return userCaseCompanyRepository.save(userCaseCompany);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserCaseCompany> findAll() {
        log.debug("Request to get all UserCaseCompanies");
        return userCaseCompanyRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<UserCaseCompany> findOne(Long id) {
        log.debug("Request to get UserCaseCompany : {}", id);
        return userCaseCompanyRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete UserCaseCompany : {}", id);
        userCaseCompanyRepository.deleteById(id);
    }
}
