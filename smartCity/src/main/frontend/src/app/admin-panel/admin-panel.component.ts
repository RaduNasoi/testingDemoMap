import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../user.model";
import {ParkService} from "../park/park.service";
import {Parking} from "../park/parking.model";
import {MarkerdataService} from "../park/markerdata.service";
import {marker, ParkComponent} from "../park/park.component";
import {connectableObservableDescriptor} from "rxjs/observable/ConnectableObservable";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  private users:User[]=[];
  private parkings:Parking[]=[];
  private searched:boolean = false;
  markers: marker[] = [];

  constructor(private userService:UserService, private parkingService:ParkService, private data: MarkerdataService) {

    this.markers = this.data.getAllMarkers();
    this.userService.getUsers().subscribe(user => {

      this.users=user;

    });

    this.parkingService.getParkingByOwner('Kylian').subscribe(
      parking => {

        this.parkings=parking;

      }
    );

    console.log(this.markers);
  }

  ngOnInit() {
    document.getElementById("profit").innerText = localStorage.getItem("profit")+"$";
    document.getElementById("rating").innerText = localStorage.getItem("rating");

  }

  setRating(rating:number){
    localStorage.setItem("rating", JSON.stringify(rating));
    location.reload();

  }

  searchUser(user:string){


    for(let u of this.users){
      if(u.username == user){
        document.getElementById("user1").innerText=u.username + "("+ u.role+")";
        this.searched= true;
        return;

      }

      document.getElementById("user1").innerText='The following users doesn\'t exists!';

    }

}

  searchUserRole(user:string){


    for(let u of this.users){
      if(u.username == user){

        return u.role;

      }

    }

  }


updateUserRole(username:string,role:string){

    // if(role == 'admin'){
    //   for(let p of this.parkings){
    //     this.parkingService.deleteParking(p);
    //   }
    //
    // }

  this.userService.updateUserRole(username,role);
  document.getElementById("user1").innerText=username + ' was turned on '+ role;

  // for(let m of this.markers) {
  //   console.log("username: "+m.username);
  //   var userRole = this.searchUserRole(m.username);
  //   console.log("user role: "+userRole);
  //   console.log("Parking: "+m.parking);
  //
  //   if (userRole != 'admin' && m.parking == true) {
  //     var position = this.markers.indexOf(m);
  //     this.markers.splice(this.markers.indexOf(m), 1);
  //     this.data.removeMarker(m, position);
  //   }
  // }
  // console.log("-----------> "+this.markers.toString());
}

deleteUser(username:string){
  this.userService.deleteUser(username);
  document.getElementById("user1").innerText='The following user was deleted!';
}

isSearched(){

    if(this.searched == true){
      return true;
    }
    else return false;

}

  isAdmin(username){

    for (let u of this.users)
      if (u.username == username && u.role == "admin") {

        return true;

      }
    return false;

  }

  isUser(username:string) {
    for (let u of this.users)
      if (u.username == username && u.role == "user") {

        return true;

      }
    return false;
  }

}
