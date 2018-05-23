package com.smartCity.smartCity.Controllers;

import com.smartCity.smartCity.Entities.Parking;
import com.smartCity.smartCity.Entities.User;
import com.smartCity.smartCity.Repositories.ParkingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(value = "/api")
public class ParkingController {

    private ParkingRepository parkingRepository;
    @Autowired
    public ParkingController(ParkingRepository parkingRepository) {
        this.parkingRepository = parkingRepository;

    }


    @RequestMapping(value = "/parks", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    @ResponseBody
    public List<Parking> getParks(){
        return parkingRepository.findAll();
    }

    @RequestMapping(value = "/getAllParkingByOwner", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    @ResponseBody
    public List<Parking> getAllParkingByOwner(@RequestParam String owner){

        return parkingRepository.findAllByOwner(owner);
    }

    @RequestMapping(value = "/addParking", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    @ResponseBody
    public void addParking(@RequestParam String name,
                           @RequestParam Long noOfPlaces,
                           @RequestParam double lat,
                           @RequestParam double lng,
                           @RequestParam String owner){
        Parking parking = new Parking(name,noOfPlaces,lat,lng,owner);
        if(parkingRepository.findByLatitudeAndAndLongitude(parking.getLatitude(),parking.getLongitude()) == null){
            parkingRepository.save(parking);
            //System.out.println("Succes!");
        }

    }

    @RequestMapping(value = "/deleteParking", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.DELETE)
    @Transactional
    public void deleteParking(@RequestParam double lat,
                           @RequestParam double lng){

        Parking parking = parkingRepository.findByLatitudeAndAndLongitude(lat,lng);
        if(parking != null){
            parkingRepository.delete(parking);
            System.out.println("Succes!");
        }

    }


}
