import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../user.model";
import {Router} from "@angular/router";
import {isNullOrUndefined} from "util";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private users: User[] = [];
  private user: User;

  constructor(private userService: UserService, private router: Router) {


    this.userService.getUsers().subscribe(user => {

      this.users = user;

    });



  }

  ngOnInit() {
  }

  checkCredentials(username: string, password1: string, password2: string, CNP: string, email: string, domain: string) {
    var role = "user";
    if ((username != "" && username != undefined) && (password1 == password2 && password1 != undefined && password2 != undefined
        && password1 != "" && password2 != "")) {

      if (CNP != undefined && CNP != null && CNP != "") {
        role = "admin";
      }

      //console.log("------------------------> "+bDayTime);

      for (let u of this.users) {
        if (u.username == username) {
          document.getElementById("error").innerText = '* This user already exists!';
          return;
        }
      }

      var user: User = new User(100, username, password1, role);

      if (domain != null && domain != undefined) {
        user.domain = domain;
      }
      else {
        user.domain = null;
      }
      if (email != null && email != undefined) {
        user.email = email;
      }
      else {
        user.email = null;
      }




      this.userService.insertUser(user);
      this.router.navigate(['/login']);
    }
    else if ((username != "" && username != undefined) && (password1 != password2 && password1 != undefined && password2 != undefined
        && password1 != "" && password2 != "")) {
      document.getElementById("error").innerText = '* You typed 2 different passwords!';
    }
    else if (username === undefined && (password1 == password2 && password1 != undefined && password2 != undefined
        && password1 != "" && password2 != "")) {
      document.getElementById("error").innerText = '* Choose an username first!';
    }
    else {
      document.getElementById("error").innerText = '* Password fields required';
    }


  }

  // insertUser(username,email, password1,password2){
  //
  //     this.userService.insertUser()
  // }

}
