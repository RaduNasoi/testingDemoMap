import {DirectionsMapDirective} from './park/googlemaps.directive';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AgmCoreModule} from '@agm/core';
import {ParkService} from "./park/park.service";
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {AppRoutingModule, routingComponents} from "./app-routing.module";
import {UserService} from "./user.service";
import {FormsModule} from "@angular/forms";
import {AuthGuard} from './auth-guard.service';
import {AuthService} from "./auth.service";
import {LocalStorageService, LocalStorage} from 'ng2-webstorage';
import {AdminGuard} from "./admin-guard.service";
import {SuperAdminGuard} from "./superAdmin-guard.service";
import {LogoutComponent} from './logout/logout.component';
import {MarkerdataService} from "./park/markerdata.service";
import {ParkformComponent} from "./parkform/parkform.component";
import {FacebookModule} from 'ngx-facebook';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {PaymentModule} from "./payments/payment/payment.module";
import {PaymentService} from "./payments/payment.service";
import {TransactionComponent} from './transaction/transaction.component';
import {TransactionService} from "./transaction/transaction.service";
import {AdminPaymentsComponent} from './admin-payments/admin-payments.component';
import {AdminPaymentsService} from "./admin-payments/admin-payments.service";
import {PagerService} from "./pager.service";
import {MyprofileComponent} from './myprofile/myprofile.component';
import {ImageUploadModule} from "angular2-image-upload";
import {ImageService} from "./myprofile/image.service";
import {SafeHtml} from "./myprofile/safeHtml";
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    DirectionsMapDirective,
    routingComponents,
    LogoutComponent,
    ParkformComponent,
    AdminPanelComponent,
    TransactionComponent,
    AdminPaymentsComponent,
    MyprofileComponent,
    SafeHtml,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    PaymentModule,
    ImageUploadModule.forRoot(),
    FacebookModule.forRoot(),
    HttpModule,
    FormsModule,
    SafeHtml,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDhPxz7eqvwOlUvWG3p18_3Y0dkvJm53bE'
    })
  ],
  providers: [
    ParkService,
    UserService,
    AuthService,
    LocalStorageService,
    AuthGuard,
    AdminGuard,
    SuperAdminGuard,
    MarkerdataService,
    TransactionService,
    AdminPaymentsService,
    PagerService,
    ImageService,
    SafeHtml],
  bootstrap: [AppComponent]
})
export class AppModule {
}

