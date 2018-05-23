import { Injectable } from '@angular/core';
import { marker} from "./park.component";

@Injectable()
export class MarkerdataService {
  markers: marker[] = [];

  constructor() { }
  getAllMarkers() {
    if (localStorage.getItem('markers') === null || localStorage.getItem('markers') === undefined) {
      localStorage.setItem('markers', JSON.stringify(this.markers));
      return this.markers;
    }
    else {
      var markers = JSON.parse(localStorage.getItem('markers'));
      return markers;
    }

  }

  addMarker(newmarker: marker) {

    var markers = JSON.parse(localStorage.getItem('markers'));
    markers.push(newmarker);
    localStorage.setItem('markers', JSON.stringify(markers));

  }


  removeMarker(mark: marker, position:number) {


    var markers = JSON.parse(localStorage.getItem('markers'));

    // for(let m of markers){
    //   if(m.lat == mark.lat && m.lng == mark.lng){
    //     m.visible=false;
    //   }
    // }

    //Delete all markers
    //markers.splice(0,markers.length);

    markers.splice(position,1);
    localStorage.setItem('markers', JSON.stringify(markers));

  }


}
