import {GoogleMapsAPIWrapper} from '@agm/core';
import {Directive, Input} from '@angular/core';
import {ParkService} from "./park.service";
import {Parking} from "./parking.model";
import {MarkerdataService} from "./markerdata.service";
import {marker} from "./park.component";

declare var google: any;

@Directive({
  selector: 'agm-map-directions'
})
export class DirectionsMapDirective {

  public markers: marker[] = [];
  public myLatitude: number;
  public myLongitude: number;
  public zoom: number;
  public parks: Parking[] = [];
  public occupiedPlaces: number = 0;

  // public destinations = [
  //   { id: 0, latitude: 46.5, longitude: 26.5 },
  //   { id: 1, latitude: 44.6, longitude: 26.5 },
  //   { id: 2, latitude: 48.7, longitude: 26.5 },
  //   { id: 3, latitude: 44.4291166, longitude: 26.0641675 },
  // ];
  public minDestination: Parking;

  constructor(private gmapsApi: GoogleMapsAPIWrapper, private parkService: ParkService, private data: MarkerdataService) {
    this.markers = this.data.getAllMarkers();
    this.parkService.getParks()
      .subscribe(
        (parks: any[]) => {
          this.parks = parks

        },
        (error) => console.log(error)
      );
  }

  ngOnInit() {
  }

  searchParking() {


    let min = Number.MAX_VALUE;
    document.getElementById('right-panel').innerText = '';
    this.gmapsApi.getNativeMap().then(map => {
      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.myLatitude = position.coords.latitude;
          this.myLongitude = position.coords.longitude;


          this.zoom = 12;


          for (let nearestDestination of this.parks) {

            // console.log(nearestDestination.name);
            //   console.log(nearestDestination.latitude);
            for (let m of this.markers) {

              if (m.name == nearestDestination.name) {
                nearestDestination.freeSpots = m.freeSpotsParking;

              }
            }

            //console.log("freeSpots: "+nearestDestination.freeSpots);


            directionsDisplay.setMap(map);
            directionsDisplay.setPanel(document.getElementById('right-panel'));
            directionsService.route({
              origin: {lat: this.myLatitude, lng: this.myLongitude},
              destination: {lat: nearestDestination.latitude, lng: nearestDestination.longitude},
              waypoints: [],
              optimizeWaypoints: true,
              travelMode: 'DRIVING'
            }, function (response, status) {
              if (status === 'OK') {

                if (min > response.routes[0].legs[0].distance.value && nearestDestination.freeSpots > 0) {

                  console.log("----> "+nearestDestination.name);
                  min = response.routes[0].legs[0].distance.value;
                  localStorage.setItem('directions', JSON.stringify(response));
                  localStorage.setItem('nearestDestination', JSON.stringify(nearestDestination));
                  directionsDisplay.setDirections(response);
                }


              } else {
                window.alert('Directions request failed due to ' + status);
              }

              console.log("nearest Destination: "+JSON.parse(localStorage.getItem('nearestDestination')).name);

            });


          }


        });
      }
    });

  }


}


