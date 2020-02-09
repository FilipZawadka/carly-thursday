package pw.react.backend.reactbackend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pw.react.backend.reactbackend.dao.RentingRepository;
import pw.react.backend.reactbackend.model.Renting;
import pw.react.backend.reactbackend.model.RentingDTO;
import pw.react.backend.reactbackend.service.RentingService;

import javax.validation.Valid;
import java.util.Collection;
import java.util.Collections;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.joining;
@RestController
@RequestMapping(path = "/renting")
public class RentingController {

    private final Logger logger = LoggerFactory.getLogger(RentingController.class);

    private RentingRepository repository;
    private RentingService RentingService;

    @Autowired
    public RentingController(RentingRepository repository, RentingService RentingService) {
        this.repository = repository;
        this.RentingService = RentingService;
    }

    @PostMapping(path = "")
    public ResponseEntity<String> createRentings(@RequestHeader HttpHeaders headers, @Valid @RequestBody Renting Renting) {
        logHeaders(headers);
        Renting result = repository.save(Renting);
        return ResponseEntity.ok(Long.toString(result.getId()));
    }

    private void logHeaders(@RequestHeader HttpHeaders headers) {
        logger.info("Controller request headers {}",
                headers.entrySet()
                        .stream()
                        .map(entry -> String.format("%s->[%s]", entry.getKey(), String.join(",", entry.getValue())))
                        .collect(joining(","))
        );
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping(path = "/{RentingId}")
    public ResponseEntity<RentingDTO> getRenting(@RequestHeader HttpHeaders headers,
                                                  @PathVariable Long RentingId) {
        logHeaders(headers);
        RentingDTO response = new RentingDTO(repository.findById(RentingId).orElseGet(() -> Renting.EMPTY));
        return ResponseEntity.ok(response);
    }

    @GetMapping(path = "/getByCar/{CarId}")
    public ResponseEntity<Collection<RentingDTO>> getAllRentingsActivity(@RequestHeader HttpHeaders headers,
                                                                         @PathVariable Long CarId) {
        logHeaders(headers);
        Collection<Renting> result;
        Collection<RentingDTO> response;
        result = repository.findRentingsByCarId(CarId);
        response = mapB2B(result);
        return ResponseEntity.ok(response);
        //return ResponseEntity.badRequest().body(Collections.emptyList());
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PutMapping(path = "/{RentingId}")
    public ResponseEntity<RentingDTO> updateRenting(@RequestHeader HttpHeaders headers,
                                                     @PathVariable Long RentingId,
                                                     @RequestBody Renting updatedCar) {
        logHeaders(headers);
        Renting result;
            result = RentingService.updateRenting(RentingId, updatedCar);
            if (Renting.EMPTY.equals(result)) {
                return ResponseEntity.badRequest().body(null);
            }
        RentingDTO response = new RentingDTO(result);
            return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @DeleteMapping(path = "/{RentingId}")
    public ResponseEntity<String> deleteRenting(@RequestHeader HttpHeaders headers, @PathVariable Long RentingId) {
        logHeaders(headers);
            boolean deleted = RentingService.deleteRenting(RentingId);
            if (!deleted) {
                return ResponseEntity.badRequest().body(String.format("Renting with id %s does not exists.", RentingId));
            }
            return ResponseEntity.ok(String.format("Renting with id %s deleted.", RentingId));

    }

    private Collection<RentingDTO> mapB2B(Collection<Renting> result) {
        Collection<RentingDTO> response;
        response = result.stream().map(objA -> {
            RentingDTO objB = new RentingDTO(objA);
            return objB;
        }).collect(Collectors.toList());
        return response;
    }
}
