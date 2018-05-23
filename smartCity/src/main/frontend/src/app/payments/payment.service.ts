import { Injectable } from '@angular/core';
import {UserService} from "../user.service";
import {Http, Response, RequestOptions,Headers} from "@angular/http";
import { Observable } from 'rxjs';
import {Payment} from "./payment.model";

@Injectable()
export class PaymentService {


  constructor(private http: Http) {

  }
  getPayments(): Observable<Payment[]> {


    // get users from api
    return this.http.get('/api/payments')
      .map((response: Response) => response.json());
  }

  insertPayment(payment:Payment){

    console.log("Insert Payment");

    this.http.post(`/api/addPayment?username=${payment.username}&price=${payment.price}&owner=${payment.owner}`
      , JSON.stringify({username: payment.username, price: payment.price,owner:payment.owner }))
      .subscribe();

  }

  processPayment(token: any, amount: number,username:string) {
    const payment = {username, token, amount };
    console.log("payment: "+ payment);
    console.log("payment amount: "+payment.amount);
    console.log("token: "+payment.token.email);
    console.log("username: "+payment.username);
    localStorage.setItem('succesfulPayment', JSON.stringify({ username: localStorage.getItem("username").toString(), pressed: true, paid:true}));
    console.log("paid: "+JSON.parse(localStorage.getItem("succesfulPayment")).paid);
    return payment;
  }

}
