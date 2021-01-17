package br.com.geekwaycore.service.impl;

import br.com.geekwaycore.service.ProofService;
import br.com.geekwaycore.domain.Proof;
import br.com.geekwaycore.repository.ProofRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Proof}.
 */
@Service
@Transactional
public class ProofServiceImpl implements ProofService {

    private final Logger log = LoggerFactory.getLogger(ProofServiceImpl.class);

    private final ProofRepository proofRepository;

    public ProofServiceImpl(ProofRepository proofRepository) {
        this.proofRepository = proofRepository;
    }

    @Override
    public Proof save(Proof proof) {
        log.debug("Request to save Proof : {}", proof);
        return proofRepository.save(proof);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Proof> findAll() {
        log.debug("Request to get all Proofs");
        return proofRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Proof> findOne(Long id) {
        log.debug("Request to get Proof : {}", id);
        return proofRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Proof : {}", id);
        proofRepository.deleteById(id);
    }
}
