import {DirectionsMapDirective} from './googlemaps.directive';
import {Component, Attribute, ElementRef, EventEmitter, Output, Input, ViewChild, HostListener} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {MarkerdataService} from "./markerdata.service";
import {ParkService} from "./park.service";
import {Parking} from "./parking.model";
import {isUndefined} from "util";
import {PaymentService} from "../payments/payment.service";
import {environment} from "../../environments/environment";
import {Payment} from "../payments/payment.model";

declare var $: any;


@Component({
  selector: 'app-park',
  templateUrl: './park.component.html',
  styleUrls: ['./park.component.css']
})
export class ParkComponent {

  // parks: Parking[] = [];
  zoom: number = 10;
  lat: number = 44.458418;
  lng: number = 26.129007;
  private index: number = 0;
  private id: number = 0;
  markers: marker[] = [];
  public parks: Parking[] = [];
  public bool: boolean = false;
  public occupiedPlaces: number = 0;
  public parkingLat: number = 0;
  public parkingLng: number = 0;
  public logo: string;
  public specificMarkers: string[] = ["info", "police", "caution", "cycling"];
  public ok: boolean = true;
  private date;
  private startDate;
  private endDate;
  public price;


  @Input() voteCount = 0;
  @Input() myVote = 0;

  @Output('vote') change = new EventEmitter();


  handler: any;

  constructor(private paymentSvc: PaymentService, private data: MarkerdataService, private parkService: ParkService, @Attribute("format") format) {


    this.date = new Date();

    setInterval(() => {
      this.date = new Date();
    }, 1000);

    this.markers = this.data.getAllMarkers();


    //  this.markers = [];
    //  this.parks=[];
    //
    // console.log("------------------------------------> " + this.markers.toString());
    // console.log("------------------------------------> " + this.markers.indexOf(this.markers[1]));
    this.parkService.getParks()
      .subscribe(
        (parks: any[]) => {
          this.parks = parks
          for (let parkings of this.parks) {
            this.bool = false;

            //let freeSpots = parkings.numberOfPlaces - occupiedPlaces;
            // let var1 = parkings.numberOfPlaces - JSON.parse(localStorage.getItem("occupiedPlaces"));
            // localStorage.setItem("numberOfPlaces", JSON.stringify(var1));
            // console.log("occupiedPlaces: "+this.occupiedPlaces);

            var newMarker: marker = {
              visible: true,
              icon: "http://maps.google.com/mapfiles/ms/micons/parkinglot.png",
              name: parkings.name,
              lat: parkings.latitude,
              lng: parkings.longitude,
              draggable: false,
              parking: true,
              freeSpotsParking: parkings.numberOfPlaces - JSON.parse(localStorage.getItem("occupiedPlaces")),
              username: parkings.owner

            };


            for (let m of this.markers) {
              if (m.lat == newMarker.lat && m.lng == newMarker.lng) {
                this.bool = true;
                //this.onDelete(m);

              }
            }
            //console.log("bool: "+this.bool);
            if (this.bool == false) {
              this.markers.push(newMarker);
              this.data.addMarker(newMarker);
            }


            if (JSON.parse(localStorage.getItem('parkingLat')) != null && JSON.parse(localStorage.getItem('parkingLng')) != null) {
              this.parkingLat = JSON.parse(localStorage.getItem('parkingLat'));
              this.parkingLng = JSON.parse(localStorage.getItem('parkingLng'));
              // console.log("======================================== " + this.parkingLat);
              // console.log("----------------------------------------> " + this.parkingLng);
            }
            else {
              this.parkingLat = 0;
              this.parkingLng = 0;

            }


          }


        },
        (error) => console.log(error)
      );


    // console.log(this.parks)
    //console.log( localStorage.getItem('markers'));


  }

  @ViewChild(DirectionsMapDirective) dc: DirectionsMapDirective;

  ngOnInit() {

    //console.log(this.markers);

    if (JSON.parse(localStorage.getItem('directions')) != null) {
      this.dc.searchParking();
    }

    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/b666f811889067.562541eff3013.png",
      locale: 'auto',
      token: token => {
        this.paymentSvc.processPayment(token, JSON.parse(localStorage.getItem("price")), localStorage.getItem("username".toString()))
        var payment: Payment = new Payment(localStorage.getItem("username").toString(), JSON.parse(localStorage.getItem("price")), JSON.parse(localStorage.getItem("bookedParking")).username, new Date);
        this.paymentSvc.insertPayment(payment);
        localStorage.removeItem("succesfulPayment");
        localStorage.removeItem("bookedParking");
      }
    });
    if (localStorage.getItem("succesfulPayment") == null) {
      localStorage.setItem('succesfulPayment', JSON.stringify({
        username: localStorage.getItem("username").toString(),
        pressed: false,
        paid: false
      }));

    }


    if (JSON.parse(localStorage.getItem("succesfulPayment")).username == localStorage.getItem("username").toString() &&
      JSON.parse(localStorage.getItem("succesfulPayment")).pressed == true &&
      JSON.parse(localStorage.getItem("succesfulPayment")).paid == false) {
      this.handlePayment(JSON.parse(localStorage.getItem("bookedParking")));
    }


  }


  ngOnDestroy() {

  }


  @ViewChild(DirectionsMapDirective) vc: DirectionsMapDirective;

  clicked() {
    this.vc.searchParking();

  }


  isThisParking(m: marker) {
    if (localStorage.getItem('nearestDestination') != null) {

      //console.log("----------------> "+localStorage.getItem('nearestDestination'))
      if (JSON.parse(localStorage.getItem('nearestDestination')).latitude == m.lat &&
        JSON.parse(localStorage.getItem('nearestDestination')).longitude == m.lng) {

        return true;

      }
    }
    else {

      return false;
    }

  }


  bookAPlace(m: marker) {

    //localStorage.removeItem("profit");
    //console.log("-------------------->"+JSON.parse(localStorage.getItem('profit')));
    var newMarker: marker = {
      visible: true,
      icon: "http://maps.google.com/mapfiles/ms/micons/parkinglot.png",
      name: m.name,
      lat: m.lat,
      lng: m.lng,
      draggable: false,
      parking: true,
      freeSpotsParking: m.freeSpotsParking - 1,
      username: m.username

    };
    //console.log("-------------------->"+newMarker.username);
    //console.log(JSON.parse(localStorage.getItem('currentUser')));
    localStorage.setItem("startDate", JSON.stringify(this.date));

    //console.log("startDate: "+parseInt(JSON.parse(localStorage.getItem('startDate'))));
    var position = this.markers.indexOf(m);
    this.markers.splice(this.markers.indexOf(m), 1);
    this.data.removeMarker(m, position);
    this.markers.push(newMarker);
    this.data.addMarker(newMarker);


    this.parkingLat = newMarker.lat;
    this.parkingLng = newMarker.lng;
    //console.log(newMarker.lat);
    // console.log(newMarker.lng);

    localStorage.setItem("parkingLat", JSON.stringify(newMarker.lat));
    localStorage.setItem("parkingLng", JSON.stringify(newMarker.lng));


    localStorage.setItem("bookedParking", JSON.stringify(newMarker));

  }

  unbookAPlace(m: marker) {

    localStorage.setItem('succesfulPayment', JSON.stringify({
      username: localStorage.getItem("username").toString(),
      pressed: true,
      paid: false
    }));

    var newMarker: marker = {
      visible: true,
      icon: "http://maps.google.com/mapfiles/ms/micons/parkinglot.png",
      name: m.name,
      lat: m.lat,
      lng: m.lng,
      draggable: false,
      parking: true,
      freeSpotsParking: m.freeSpotsParking + 1,
      username: m.username

    };
    //console.log("Owner: "+m.username);
    //console.log("Owner2: "+newMarker.username);

    localStorage.setItem("endDate", JSON.stringify(this.date));
    //console.log("endDate: "+parseInt(JSON.parse(localStorage.getItem('endDate'))));
    this.startDate = Date.parse(JSON.parse(localStorage.getItem('startDate')));
    this.endDate = Date.parse(JSON.parse(localStorage.getItem('endDate')));

    var position = this.markers.indexOf(m);
    this.markers.splice(this.markers.indexOf(m), 1);
    this.data.removeMarker(m, position);
    this.markers.push(newMarker);
    this.data.addMarker(newMarker);
    localStorage.removeItem("parkingLat");
    localStorage.removeItem("parkingLng");
    //console.log(this.endDate - this.startDate);
    this.price = (this.endDate - this.startDate) / 1000 * 0.01;
    localStorage.setItem("price", JSON.stringify(this.price));
    this.handlePayment(newMarker);
    if (JSON.parse(localStorage.getItem('profit')) == null) {
      localStorage.setItem("profit", JSON.stringify(this.price * 0.15));
    }
    else {
      localStorage.setItem("profit", JSON.stringify(JSON.parse(localStorage.getItem('profit')) + this.price * 0.15));
    }


  }


  onClick(m: any) {


  }

  onMapClicked($event) {


    if (document.getElementById('marker').innerText != "") {
      this.logo = document.getElementById('marker').innerText;
    }
    else {
      this.logo = "info";
    }
    this.index++;
    var newMarker: marker = {
      visible: true,
      icon: "http://maps.google.com/mapfiles/ms/micons/" + this.logo + ".png",
      name: '-',
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true,
      parking: false,
      username: localStorage.getItem("username").toString(),
      votes: 0


    }

    this.markers.push(newMarker);
    this.data.addMarker(newMarker);
  }

  //}
  onDelete(m: marker) {

    // this.markers[this.markers.indexOf(m)].visible = false;
    // this.data.removeMarker(m);

    var position = this.markers.indexOf(m);
    this.markers.splice(this.markers.indexOf(m), 1);
    this.data.removeMarker(m, position);
    if (m.parking == true) {
      var parking: Parking = new Parking(m.name, m.freeSpotsParking, m.lng, m.lat, m.username);
      this.parkService.deleteParking(parking);
      location.reload();
    }

  }

  markerDragEnd(m, $event) {

    this.logo = document.getElementById('marker').innerText;

    var newMarker: marker = {
      visible: true,
      icon: m.icon,
      name: m.name,
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true,
      parking: false,
      username: localStorage.getItem("username").toString(),
      votes: 0

    };
    this.onDelete(m);
    this.markers.push(newMarker);
    this.data.addMarker(newMarker);
  }

  addEvent(m: marker, eventName: string) {

    var newMarker: marker = {
      visible: true,
      icon: m.icon,
      name: eventName,
      lat: m.lat,
      lng: m.lng,
      draggable: true,
      parking: false,
      username: localStorage.getItem("username").toString(),
      votes: 0

    };
    this.onDelete(m);
    this.markers.push(newMarker);
    this.data.addMarker(newMarker);
    //console.log("votes: "+newMarker.votes);

  }

  isParking(m: marker) {
    if (m.parking == true) {
      return true;
    }
    else return false;

  }


  isAdmin() {
    if (localStorage.getItem("role") == "admin")
      return true;
    else
      return false;
  }

  isUser() {
    if (localStorage.getItem("token") != null)
      return true;
    else
      return false;
  }

  isSuperAdmin() {
    if (localStorage.getItem("role") == "superadmin")
      return true;
    else
      return false;
  }


  upVote(m: marker) {


    if (m.voters === undefined) {
      m.voters = m.username;
    }

    console.log("voters: " + m.voters);
    let stringToSplit = m.voters;
    let users = stringToSplit.split(" ");
    for (let i = 0; i < users.length; i++) {
      if (users[i] == localStorage.getItem("username").toString()) {
        this.ok = false;
      }
    }
    if (this.ok == true) {
      var newMarker: marker = {
        visible: true,
        icon: m.icon,
        name: m.name,
        lat: m.lat,
        lng: m.lng,
        draggable: true,
        parking: false,
        username: m.username,
        votes: m.votes + 1,
        voters: localStorage.getItem("username").toString().concat(" ", m.voters)
      };


      this.onDelete(m);
      this.markers.push(newMarker);
      this.data.addMarker(newMarker);
      // console.log("laaaaaaaaaaaaaaaa");
      // console.log(newMarker.voters);

      //   }
      // }
      this.myVote++;
      this.emitEvent();
      //location.reload();

      // localStorage.setItem('currentMarker', JSON.stringify({ username: localStorage.getItem("username").toString(),
      //   voted: true,marker:m }));
    }

    if (m.username == localStorage.getItem("username").toString()) {
      document.getElementById("error").innerText = 'You cannot vote an event you created';
      location.reload();
    }
    else if (m.voters.includes(localStorage.getItem("username").toString())) {
      document.getElementById("error").innerText = 'You already rated this event';
      location.reload();
    }
    //localStorage.removeItem("currentMarker");
  }

  downVote(m: marker) {


    if (m.voters === undefined) {
      m.voters = m.username;
    }

    console.log("voters: " + m.voters);
    let stringToSplit = m.voters;
    let users = stringToSplit.split(" ");
    //console.log("Event creator: "+users[0]);
    //console.log("Event creator2: "+m.username);
    for (let i = 0; i < users.length; i++) {
      if (users[i] == localStorage.getItem("username").toString()) {
        this.ok = false;
      }
    }

    //console.log(this.ok);
    //console.log(m.votes);
    if (this.ok == true) {

      var newMarker: marker = {
        visible: true,
        icon: m.icon,
        name: m.name,
        lat: m.lat,
        lng: m.lng,
        draggable: true,
        parking: false,
        username: m.username,
        votes: m.votes - 1,
        voters: localStorage.getItem("username").toString().concat(" ", m.voters)
      };


      this.onDelete(m);
      this.markers.push(newMarker);
      this.data.addMarker(newMarker);


      this.myVote--;
      this.emitEvent();


    }

    if (m.username == localStorage.getItem("username").toString()) {
      document.getElementById("error").innerText = 'You cannot rate an event you created';
      location.reload();
    }
    else if (m.voters.includes(localStorage.getItem("username").toString())) {
      document.getElementById("error").innerText = 'You already rated this event';
      location.reload();
    }


    if (m.votes - 1 == -JSON.parse(localStorage.getItem("rating")) && this.ok == true) {
      this.onDelete(newMarker);
    }

  }

  emitEvent() {
    this.change.emit({myVote: this.myVote});


  }


  handlePayment(m: marker) {
    this.handler.open({
      name: 'SmartCity',
      amount: JSON.parse(localStorage.getItem("price")) * 100,
      closed: function () {
        location.reload();
        //console.log("la:::::::::"+localStorage.getItem("succesfulPayment"));
      }

    });


  }

  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close()
  }


  onClickUser(username: String) {
    localStorage.setItem("userProfile",JSON.stringify(username))
  }
}

export interface marker {
  name?: string;
  icon: string;
  lat: number;
  lng: number;
  draggable: boolean;
  visible: boolean;
  parking: boolean;
  username?: string;
  freeSpotsParking?: number;
  votes?: number;
  voters?: string;

}
