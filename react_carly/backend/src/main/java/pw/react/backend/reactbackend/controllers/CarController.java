package pw.react.backend.reactbackend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.web.bind.annotation.*;


import pw.react.backend.reactbackend.dao.CarRepository;
import pw.react.backend.reactbackend.model.Car;
import pw.react.backend.reactbackend.service.CarService;

import javax.validation.Valid;
import java.util.List;

import static java.util.stream.Collectors.joining;
@RestController
@RequestMapping(path = "/Cars")
public class CarController {

    private final Logger logger = LoggerFactory.getLogger(CarController.class);

    private CarRepository repository;
    private CarService carService;

    @Autowired
    public CarController(CarRepository repository, CarService CarService) {
        this.repository = repository;
        this.carService = CarService;
    }

    @PostMapping(path = "")
    public ResponseEntity<String> createCar(@RequestHeader HttpHeaders headers, @Valid @RequestBody List<Car> cars) {
            List<Car> result = (List<Car>) repository.saveAll(cars);
            return ResponseEntity.ok(result.stream().map(c -> String.valueOf(c.getId())).collect(joining(",")));

    }


    private void logHeaders(@RequestHeader HttpHeaders headers) {
        logger.info("Controller request headers {}",
                headers.entrySet()
                        .stream()
                        .map(entry -> String.format("%s->[%s]", entry.getKey(), String.join(",", entry.getValue())))
                        .collect(joining(","))
        );
    }

    @GetMapping(path = "/{CarId}")
    public ResponseEntity<Car> getCar(@RequestHeader HttpHeaders headers,
                                              @PathVariable Long CarId) {
        logHeaders(headers);

        return ResponseEntity.ok(repository.findById(CarId).orElseGet(() -> Car.EMPTY));

    }

    @GetMapping(path = "")
    public ResponseEntity<MappingJacksonValue> getAllCars(@RequestHeader HttpHeaders headers)
    {
        logHeaders(headers);
        MappingJacksonValue wrapper = new MappingJacksonValue(repository.findAll());

            return ResponseEntity.ok(wrapper);

    }

    @PutMapping(path = "/{CarId}")
    public ResponseEntity<Car> updateCar(@RequestHeader HttpHeaders headers,
                                                 @PathVariable Long CarId,
                                                 @RequestBody Car updatedCar) {
        Car result;
            result = carService.updateCar(CarId, updatedCar);
            if (Car.EMPTY.equals(result)) {
                return ResponseEntity.badRequest().body(updatedCar);
            }
            return ResponseEntity.ok(result);
    }

    @DeleteMapping(path = "/{CarId}")
    public ResponseEntity<String> deleteCar(@RequestHeader HttpHeaders headers, @PathVariable Long carId, @PathVariable String CarId) {
        logHeaders(headers);
            boolean deleted = carService.deleteCar(carId);
            if (!deleted) {
                return ResponseEntity.badRequest().body(String.format("Car with id %s does not exists.", carId));
            }
            return ResponseEntity.ok(String.format("Car with id %s deleted.", carId));
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String model, @RequestParam Integer page, @RequestParam String sort) {
        List<Car> cars = carService.search(model, page, sort);

        return ResponseEntity.ok(cars);
    }

}