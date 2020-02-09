package pw.react.backend.reactbackend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pw.react.backend.reactbackend.model.Renting;
import pw.react.backend.reactbackend.model.Car;

import java.time.LocalDateTime;
import java.util.List;

public interface RentingRepository extends JpaRepository<Renting, Long> {
    @Query(value = "SELECT renting FROM Renting renting where renting.carId = :carId")
    List<Renting> findRentingsByCarId(@Param("carId") Long carId);

    @Query("SELECT COUNT(renting) FROM Renting renting " +
            "where (renting.startDate <= :toDate and renting.endDate >= :fromDate) " +
            "and renting.carId = :parkingSpotId")
   int checkOverlappingDates(@Param("fromDate") LocalDateTime fromDate,
                                   @Param("toDate") LocalDateTime toDate,
                                        @Param("parkingSpotId") Car carId);
}