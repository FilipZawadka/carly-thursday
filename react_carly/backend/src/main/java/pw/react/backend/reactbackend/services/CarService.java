package pw.react.backend.reactbackend.service;

import pw.react.backend.reactbackend.model.Car;

import java.util.List;

public interface CarService {
    Car updateCar(Long carId, Car updateCar);
    boolean deleteCar(Long carId);
    List<Car> search(String model, Integer page, String sort);
}
