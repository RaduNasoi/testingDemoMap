import { Injectable } from '@angular/core';
import {Response, Headers,Http} from "@angular/http";
import { Observable } from 'rxjs';
import {Payment} from "../payments/payment.model";

@Injectable()
export class TransactionService {

  constructor(private http: Http) {

  }
  getPayments(): Observable<Payment[]> {


    // get users from api
    return this.http.get('/api/payments')
      .map((response: Response) => response.json());
  }

  getAllPaymentsByOwner(owner:string): Observable<Payment[]> {


    // get users from api
    return this.http.get(`/api/getAllPaymentsByOwner?owner=${owner}`)
      .map((response: Response) => response.json());
  }
}
