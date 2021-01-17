package br.com.geekwaycore.service.impl;

import br.com.geekwaycore.service.VocationalTestService;
import br.com.geekwaycore.domain.VocationalTest;
import br.com.geekwaycore.repository.VocationalTestRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link VocationalTest}.
 */
@Service
@Transactional
public class VocationalTestServiceImpl implements VocationalTestService {

    private final Logger log = LoggerFactory.getLogger(VocationalTestServiceImpl.class);

    private final VocationalTestRepository vocationalTestRepository;

    public VocationalTestServiceImpl(VocationalTestRepository vocationalTestRepository) {
        this.vocationalTestRepository = vocationalTestRepository;
    }

    @Override
    public VocationalTest save(VocationalTest vocationalTest) {
        log.debug("Request to save VocationalTest : {}", vocationalTest);
        return vocationalTestRepository.save(vocationalTest);
    }

    @Override
    @Transactional(readOnly = true)
    public List<VocationalTest> findAll() {
        log.debug("Request to get all VocationalTests");
        return vocationalTestRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<VocationalTest> findOne(Long id) {
        log.debug("Request to get VocationalTest : {}", id);
        return vocationalTestRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete VocationalTest : {}", id);
        vocationalTestRepository.deleteById(id);
    }
}
