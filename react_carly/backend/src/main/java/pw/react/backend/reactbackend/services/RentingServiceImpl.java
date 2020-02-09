package pw.react.backend.reactbackend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pw.react.backend.reactbackend.dao.RentingRepository;
import pw.react.backend.reactbackend.model.Renting;

@Service
public class RentingServiceImpl implements RentingService {
    private final Logger logger = LoggerFactory.getLogger(RentingServiceImpl.class);

    private RentingRepository repository;

    RentingServiceImpl() { }

    @Autowired
    RentingServiceImpl(RentingRepository repository) {
        this.repository = repository;
    }

    @Override
    public Renting updateRenting(Long id, Renting updatedParkingSpot) {
        Renting result = Renting.EMPTY;
        if (repository.existsById(id)) {
            updatedParkingSpot.setId(id);
            result = repository.save(updatedParkingSpot);
            logger.info("Renting with id {} updated.", id);
        }
        return result;
    }

    @Override
    public boolean deleteRenting(Long CarId) {
        boolean result = false;
        if (repository.existsById(CarId)) {
            repository.deleteById(CarId);
            logger.info("Renting with id {} deleted.", CarId);
            result = true;
        }
        return result;
    }

}