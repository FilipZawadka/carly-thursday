package pw.react.backend.reactbackend.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;


import javax.persistence.*;
import java.io.Serializable;


@Entity
@Table(name = "car")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Car implements Serializable {

    public static Car EMPTY = new Car();


    @Id
    @Column(name="CarId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "registrationNumber")
    private int registrationNumber;
    @Column(name = "brand")
    private String brand;
    @Column(name = "model")
    private String model;
    @Column(name = "location")
    private String location;
    @Column(name = "rentingCompany")
    private String rentingCompany;
    @Column(name = "price")
    private int price;
    @Column(name = "yearOfProduction")
    private int yearOfProduction;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(int registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getRentingCompany() {
        return rentingCompany;
    }

    public void setRentingCompany(String rentingCompany) {
        this.rentingCompany = rentingCompany;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getYearOfProduction() {
        return yearOfProduction;
    }

    public void setYearOfProduction(int yearOfProduction) {
        this.yearOfProduction = yearOfProduction;
    }
}