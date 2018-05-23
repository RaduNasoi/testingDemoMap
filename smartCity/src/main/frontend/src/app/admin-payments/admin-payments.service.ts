import {Injectable} from '@angular/core';
import {Response, Headers, Http} from "@angular/http";
import {Observable} from 'rxjs';
import {Payment} from "../payments/payment.model";

@Injectable()
export class AdminPaymentsService {

  constructor(private http: Http) {

  }

  getPaymentsByOwner(owner: string): Observable<Payment[]> {
    // get users from api
    return this.http.get(`/api/getAllPaymentsByOwner?owner=${owner}`)
      .map((response: Response) => response.json());
  }

}
