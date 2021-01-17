package br.com.geekwaycore.service.impl;

import br.com.geekwaycore.service.CarrerService;
import br.com.geekwaycore.domain.Carrer;
import br.com.geekwaycore.repository.CarrerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Carrer}.
 */
@Service
@Transactional
public class CarrerServiceImpl implements CarrerService {

    private final Logger log = LoggerFactory.getLogger(CarrerServiceImpl.class);

    private final CarrerRepository carrerRepository;

    public CarrerServiceImpl(CarrerRepository carrerRepository) {
        this.carrerRepository = carrerRepository;
    }

    @Override
    public Carrer save(Carrer carrer) {
        log.debug("Request to save Carrer : {}", carrer);
        return carrerRepository.save(carrer);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Carrer> findAll(Pageable pageable) {
        log.debug("Request to get all Carrers");
        return carrerRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Carrer> findOne(Long id) {
        log.debug("Request to get Carrer : {}", id);
        return carrerRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Carrer : {}", id);
        carrerRepository.deleteById(id);
    }
}
