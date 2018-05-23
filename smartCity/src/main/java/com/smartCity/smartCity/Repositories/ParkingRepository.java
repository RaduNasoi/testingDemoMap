package com.smartCity.smartCity.Repositories;

import com.smartCity.smartCity.Entities.Parking;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParkingRepository extends CrudRepository<Parking, Long> {

    List<Parking> findAll();
    Parking findByLatitudeAndAndLongitude(Double lat, Double lng);
    List<Parking> findAllByOwner(String owner);
}
