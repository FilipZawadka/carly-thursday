package pw.react.backend.reactbackend.dao;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import pw.react.backend.reactbackend.model.Car;

import java.util.List;

public interface CarRepository extends PagingAndSortingRepository<Car, Long> {
    List<Car> findAllByModelIgnoreCaseContains(String model, Pageable pageable);
}
