package pw.react.backend.reactbackend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pw.react.backend.reactbackend.dao.CarRepository;
import pw.react.backend.reactbackend.model.Car;

import java.util.List;

@Service
public class CarServiceImpl implements CarService {
    private final Logger logger = LoggerFactory.getLogger(RentingServiceImpl.class);
    public static final int PAGE_SIZE = 32;

    private CarRepository repository;

    CarServiceImpl() { }

    @Autowired
    CarServiceImpl(CarRepository repository) {
        this.repository = repository;
    }

    @Override
    public Car updateCar(Long id, Car updatedCar) {
        Car result = Car.EMPTY;
        if (repository.existsById(id)) {
            updatedCar.setId(id);
            result = repository.save(updatedCar);
            logger.info("Car with id {} updated.", id);
        }
        return result;
    }

    @Override
    public boolean deleteCar(Long id) {
        boolean result = false;
        if (repository.existsById(id)) {
            repository.deleteById(id);
            logger.info("Car with id {} deleted.", id);
            result = true;
        }
        return result;
    }

    @Override
    public List<Car> search(String model, Integer page, String sort) {
        Pageable pageable;
        if(page != null && sort != null) {
            Sort.Direction direction = sort == "ascending" ? Sort.Direction.ASC : Sort.Direction.DESC;
            pageable = PageRequest.of(page, PAGE_SIZE, direction, "model");
        } else {
            pageable = Pageable.unpaged();
        }

        return repository.findAllByModelIgnoreCaseContains(model, pageable);
    }

}
