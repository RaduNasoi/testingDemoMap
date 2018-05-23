import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {UserService} from "./user.service";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  public canActivate() {
    if (localStorage.getItem('currentUser') && localStorage.getItem("role")=="admin") {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['login']);
    return false;
  }
}
