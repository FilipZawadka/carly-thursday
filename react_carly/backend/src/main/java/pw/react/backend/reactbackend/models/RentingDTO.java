package pw.react.backend.reactbackend.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import pw.react.backend.reactbackend.utils.JsonDateDeserializer;
import pw.react.backend.reactbackend.utils.JsonDateSerializer;

import java.time.LocalDateTime;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class RentingDTO {

    public long getId() {
        return id;
    }

    public long getCarId() {
        return carId;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    private long id;
    private long carId;
    @JsonDeserialize(using = JsonDateDeserializer.class)
    @JsonSerialize(using = JsonDateSerializer.class)
    private LocalDateTime startDate;
    @JsonDeserialize(using = JsonDateDeserializer.class)
    @JsonSerialize(using = JsonDateSerializer.class)
    private LocalDateTime endDate;

    public RentingDTO(Renting renting) {
        this.id = renting.getId();
        this.carId = renting.getCarId();
        this.startDate = renting.getStartDate();
        this.endDate = renting.getEndDate();
    }



}
