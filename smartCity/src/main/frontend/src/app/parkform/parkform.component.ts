import { Component, OnInit } from '@angular/core';
import {marker} from "../park/park.component";
import {MarkerdataService} from "../park/markerdata.service";
import {Parking} from "../park/parking.model";
import {ParkService} from "../park/park.service";

@Component({
  selector: 'app-parkform',
  templateUrl: './parkform.component.html',
  styleUrls: ['./parkform.component.css']
})
export class ParkformComponent implements OnInit {

  markers: marker[] = [];
  public  parks: Parking[] = [];
  finalMarker:marker;

  constructor(private data: MarkerdataService, private parkService:ParkService) {

  }

  ngOnInit() {


  }

  onClick(m: any) {
    console.log(m);
    console.log(this.parks);

  }

  onMapClicked($event) {


    var newMarker: marker = {
      visible: true,
      icon: "http://maps.google.com/mapfiles/ms/micons/parkinglot.png",
      name: '-',
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true,
      parking: true,
      username: localStorage.getItem("username").toString()


    };

    this.markers.push(newMarker);
    //this.data.addMarker(newMarker);
    this.finalMarker = newMarker;
  }

  onDelete(m:marker)
  {

    // this.markers[this.markers.indexOf(m)].visible = false;
    // this.data.removeMarker(m);

    var position = this.markers.indexOf(m);
    this.markers.splice(this.markers.indexOf(m),1);
    this.data.removeMarker(m,position);

  }

  markerDragEnd(m, $event){

    //this.logo=document.getElementById('marker').innerText;

    var newMarker:marker={
      visible:true,
      icon:m.icon,
      name:m.name,
      lat:$event.coords.lat,
      lng:$event.coords.lng,
      draggable:true,
      parking:true,
      username:localStorage.getItem("username").toString()

    };
    this.onDelete(m);
    this.markers.push(newMarker);
    //this.data.addMarker(newMarker);
    this.finalMarker = newMarker;
  }
  // addEvent(m:marker, eventName:string){
  //
  //   var newMarker:marker={
  //     visible:true,
  //     icon:m.icon,
  //     name:eventName,
  //     lat:m.lat,
  //     lng:m.lng,
  //     draggable:true,
  //     parking:false,
  //     username:localStorage.getItem("username").toString()
  //
  //   };
  //   this.onDelete(m);
  //   this.markers.push(newMarker);
  //   this.data.addMarker(newMarker);
  //
  // }

  // isParking(m:marker){
  //   if(m.parking == true){
  //     return true;
  //   }
  //   else return false;
  //
  // }

  enroll(name:string,noCars:number){

    console.log(name);
    console.log(noCars);
    this.finalMarker.name = name;
    this.finalMarker.freeSpotsParking = noCars;
    this.markers.push(this.finalMarker);
    this.data.addMarker(this.finalMarker);
    console.log("lat: "+this.finalMarker.lat);
    console.log("lng: "+this.finalMarker.lng);
    var parking:Parking = new Parking(name,noCars,this.finalMarker.lng,this.finalMarker.lat,localStorage.getItem("username").toString());
    this.parkService.insertParking(parking);
  }

}
