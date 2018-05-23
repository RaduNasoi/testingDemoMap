package com.smartCity.smartCity.Entities;

import javax.persistence.*;

@Entity
@Table(name="parking")
public class Parking {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "number_of_places")
    private Long numberOfPlaces;


    @Column(name="latitude")
    private Double latitude;

    @Column(name="longitude")
    private Double longitude;

    @Column(name="owner")
    private String owner;


    public Parking(){

    }

    public Parking(String name, Long numberOfPlaces, Double latitude, Double longitude, String owner) {
        this.name = name;
        this.numberOfPlaces = numberOfPlaces;
        this.latitude = latitude;
        this.longitude = longitude;
        this.owner = owner;
    }

    public Parking(String name, Long numberOfPlaces, Double latitude, Double longitude) {
        this.name = name;
        this.numberOfPlaces = numberOfPlaces;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getNumberOfPlaces() {
        return numberOfPlaces;
    }

    public void setNumberOfPlaces(Long numberOfPlaces) {
        this.numberOfPlaces = numberOfPlaces;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }
}

