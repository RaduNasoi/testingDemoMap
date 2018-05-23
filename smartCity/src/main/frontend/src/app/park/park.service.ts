import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';
import {Parking} from "./parking.model";

@Injectable()
export class ParkService {
  constructor(private http: Http) {

  }

  getParks() {
    return this.http.get('/api/parks')
      .map(
        (response: Response) => {

          return response.json();


        }
      );
  }

  insertParking(parking: Parking) {


    this.http.post(`/api/addParking?name=${parking.name}&noOfPlaces=${parking.numberOfPlaces}
    &lat=${parking.latitude}&lng=${parking.longitude}&owner=${parking.owner}`
      , JSON.stringify({
        name: parking.name, noOfPlaces: parking.numberOfPlaces,
        lat: parking.latitude, lng: parking.longitude, owner: parking.owner
      }))
      .subscribe();

  }

  deleteParking(parking: Parking) {


    this.http.delete(`/api/deleteParking?lat=${parking.latitude}&lng=${parking.longitude}`
      , JSON.stringify({lat: parking.latitude, lng: parking.longitude}))
      .subscribe();

  }

  getParkingByOwner(owner: string) {
    return this.http.get(`/api/getAllParkingByOwner?owner=${owner}`)
      .map((response: Response) => response.json());
  }
}
