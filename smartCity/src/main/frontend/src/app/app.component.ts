
import {Component, Input, OnInit, AfterViewChecked, HostListener} from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import { FacebookService, InitParams,LoginResponse } from 'ngx-facebook';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //
  //
  // zoom: number = 10;
  // lat: number = 44.458418;
  // lng: number = 26.129007;
  // origin : number;
  // destination :number;


  private router:Router;
  private loaded:Boolean;
  constructor(private authService:AuthService){

  }

  fbLogin(){
    this.authService.loginWithFacebook();
  }



  currentUser(){
    let currentUser = localStorage.getItem("username");

  if(currentUser!= null)
  {
    return currentUser;
  }
  else{
    return "Guest";
  }
  }

ngOnInit(){
  //console.log(JSON.parse(localStorage.getItem('directions')));

}
  ngAfterViewChecked() {
    let self=this;
    $(".nav a").on("click", function(){
      $(".nav").find(".active").removeClass("active");
      $(this).parent().addClass("active");
    });

   if(localStorage.getItem("parkingLat")!=null){
     $("#formSave").prop('disabled',true);

   }
   else{
     $("#formSave2").prop('disabled',true);
   }
  }

  isAdmin(){
    if(localStorage.getItem("role")=="admin")
      return true;
    else
      return false;
  }

  isUser(){
    if(localStorage.getItem("token")!=null)
      return true;
    else
      return false;
  }

  isSuperAdmin(){
    if(localStorage.getItem("role")=="superadmin")
      return true;
    else
      return false;
  }

  isAnActiveBook(){
    if(localStorage.getItem("bookedParking")!=null){
      return true;
    }
    else return false;
  }


  //
  // login= function () {
  //   this.router.navigateByUrl('/login');
  // };
  // register= function () {
  //   this.router.navigateByUrl('/register');
  // };



  // @ViewChild(DirectionsMapDirective) vc:DirectionsMapDirective;
  // clicked(){
  //   this.vc.searchParking();
  //
  // }

  // @ViewChild(LoginComponent) lc:LoginComponent;
  // clicked2(){
  //   user = this.lc.getCurrentUser().username;
  //
  // }

  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHander(event) {


  }

  @HostListener('window:unload', [ '$event' ])
  unloadHandler(event) {
    //console.log("Refresh2");
  }



}

