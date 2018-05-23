import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {UserService} from "./user.service";

@Injectable()
export class SuperAdminGuard implements CanActivate {
  constructor(private router: Router) {}

  public canActivate() {
    if (localStorage.getItem('currentUser') && localStorage.getItem("role")=="superadmin") {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['login']);
    return false;
  }
}
