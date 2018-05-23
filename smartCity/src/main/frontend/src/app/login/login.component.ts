import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {User} from "../user.model";
import {UserService} from "../user.service";
import {Router} from '@angular/router';
import {AuthService} from "../auth.service";
import {Cookie} from 'ng2-cookies/ng2-cookies';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loading = false;

  error = '';


  constructor(private router: Router, private authenticationService: AuthService) {

  }

  ngOnInit() {

    // reset login status

    // this.authenticationService.logout();

  }


  login(username, password) {


    this.loading = true;

    this.authenticationService.login(username, password)

      .subscribe(result => {


        // console.log();
        if (result === true) {

          // login successful

          this.router.navigate(['park']);

        } else {

          console.log("login failed\n:");
          // login failed

          this.error = 'Username or password is incorrect';

          this.loading = false;

        }

      }, error => {

        this.loading = false;

        this.error = error;
        document.getElementById("error").innerText = '* Username or password is incorrect';

        if (username === undefined || password === undefined || username == "" || password == "") {
          document.getElementById("error").innerText = '* Fill all fields first and after login';
        }


      });
  }
}



