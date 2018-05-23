import {Injectable, ViewChild} from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {LoginOptions,AuthResponse, FacebookService, InitParams,LoginResponse } from 'ngx-facebook';
import { Router } from '@angular/router';
import {User} from "./user.model";
import {UserService} from "./user.service";
import {ParkComponent} from "./park/park.component";

//const authResponse: AuthResponse = this.fb.getAuthResponse();
const options: LoginOptions = {
  scope: 'public_profile,user_friends,email,pages_show_list',
  return_scopes: true,
  enable_profile_selector: true
};


@Injectable()
export class AuthService {



  private headers = new Headers({'Content-Type': 'application/json'});
  private response:LoginResponse;
  private allUsers:User[];

  @ViewChild(ParkComponent) pc:ParkComponent;

  constructor(private router: Router,private http: Http,private fb: FacebookService,private userService:UserService) {
    let initParams: InitParams = {
      appId: '164895710794428',
      xfbml: true,
      version: 'v2.11'
    };

    fb.init(initParams);

    //console.log(JSON.parse(localStorage.getItem('intrat')));


  }

  loginWithFacebook(): void {
    if(localStorage.getItem("token")==null) {

      this.fb.login(options)
        .then((response: LoginResponse) => {
          console.log('Logged in', response);
          this.me()
        })
        .catch(e => console.error('Error logging in'));


      console.log("auth: " + this.fb.getAuthResponse());
      console.log('response:', this.response);
    }
  }

  me() {


      this.fb.api('/me?fields=id,name,first_name,gender,picture.width(150).height(150),age_range,friends')
        .then(res => {
          console.log(res);
          console.log(res.name);
          res.name = res.name.replace(/ /g,'');

          var user: User = new User(res.id, res.name, "facebook", "user");

          this.userService.insertUser(user);
          this.userService.getUsers().subscribe(users => {
            console.log(users);
          });

          this.login(user.username, user.password).subscribe(result => {

            // console.log();
            if (result === true) {

              // login successful


              this.router.navigate(['park']);

            } else {

              console.log("login failed\n:");
              // login failed
              this.router.navigate(['login']);


            }

          }, error => {

            // this.loading = false;
            //
            // this.error = error;
            // document.getElementById("error").innerText='* Username or password is incorrect';
            //
            // if(username === undefined || password === undefined || username=="" || password==""){
            //   document.getElementById("error").innerText='* Fill all fields first and after login';
            // }


          });
          console.log("HHHHHHHHHHHHHHHHHHHHHHH");
        })
        .catch(e => console.log(e));

  }


  login(username: string, password: string): Observable<boolean> {

    return this.http.post(`api/authenticate/?username=${username}&password=${password}`, JSON.stringify({username: username, password: password}), {headers: this.headers})
      .map((response: Response) => {

        if(response.json().username!=null && response.json().password!=null){
        // login successful if there's a jwt token in the response
        let token = ""+Math.floor(Math.random() * 600) + 1;

          //console.log(response.json().role);
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
          localStorage.setItem("username",response.json().username);
          localStorage.setItem("role",response.json().role);
          localStorage.setItem("token", token);


          // return true to indicate successful login
          return true;
         }else {
          // return false to indicate failed login
          return false;
        }
      }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }






  logout(): void {
    // clear token remove user from local storage to log user out

    localStorage.removeItem("currentUser");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("firstTime");
    localStorage.removeItem('directions');
    localStorage.removeItem("occupiedPlaces");
    localStorage.removeItem("parkingLat");
    localStorage.removeItem("parkingLng");
    localStorage.removeItem("nearestDestination");
    localStorage.removeItem("addPark");
    localStorage.removeItem("ParkingLat");
    localStorage.removeItem("ParkingLng");
    localStorage.removeItem("succesfulPayment");
    this.fb.logout().then(() => console.log('Logged out!'));


  }
}



