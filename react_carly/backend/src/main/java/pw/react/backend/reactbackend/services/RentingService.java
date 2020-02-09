package pw.react.backend.reactbackend.service;

import pw.react.backend.reactbackend.model.Renting;

public interface RentingService {
    Renting updateRenting(Long id, Renting updatedRenting);
    boolean deleteRenting(Long id);
}
