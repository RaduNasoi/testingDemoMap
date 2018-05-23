import {Component, OnInit} from '@angular/core';
import {Payment} from "../payments/payment.model";
import {TransactionService} from "../transaction/transaction.service";
import {AdminPaymentsService} from "./admin-payments.service";
import {PagerService} from "../pager.service";

@Component({
  selector: 'app-admin-payments',
  templateUrl: './admin-payments.component.html',
  styleUrls: ['./admin-payments.component.css']
})
export class AdminPaymentsComponent implements OnInit {


  constructor(private transactionService: TransactionService, private pagerService: PagerService) {

  }

  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];


  ngOnInit(): void {

    this.transactionService.getAllPaymentsByOwner(localStorage.getItem("username").toString()).subscribe(data => {

      // set items to json response
      this.allItems = data;

      // initialize to page 1
      this.setPage(1);

    });
  }


  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
