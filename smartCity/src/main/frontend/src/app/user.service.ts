import {Injectable} from "@angular/core";
import {Http, Response, RequestOptions,Headers} from "@angular/http";
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import {AuthService} from "./auth.service";
import { Observable } from 'rxjs';
import {User} from "./user.model";

@Injectable()
export class UserService{
  constructor(private http: Http) {
  }

  getUsers(): Observable<User[]> {


    // get users from api
    return this.http.get('/api/users')
      .map((response: Response) => response.json());
  }

  getUserByUsername(username): Observable<User>{


    return this.http.get(`/api/getUserByUsername?username=${username}`)
      .map(res => res )
      // ...errors if any
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

  insertUser(user:User){

    console.log("insertUser");

    this.http.post(`/api/addUser/?username=${user.username}&password=${user.password}&role=${user.role}&email=${user.email}&domain=${user.domain}`
      , JSON.stringify({username: user.username, password: user.password}))
      .subscribe();

  }

  updateUserRole(username:string,role:string){
    this.http.post(`/api/updateUserRole?username=${username}&role=${role}`
      , JSON.stringify({username: username, role: role}))
      .subscribe();

  }

  deleteUser(username:string){
    this.http.delete(`/api/deleteUser?username=${username}`
      , JSON.stringify({username: username}))
      .subscribe();
  }

}
