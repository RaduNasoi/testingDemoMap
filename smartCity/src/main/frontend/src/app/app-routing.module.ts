import {NgModule} from "@angular/core";
import{RouterModule,Routes} from "@angular/router";
import{LoginComponent} from "./login/login.component";
import{ParkComponent} from "./park/park.component";
import{RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";
import {ParkformComponent} from "./parkform/parkform.component";
import { AuthGuard } from './auth-guard.service';
import {AdminGuard} from "./admin-guard.service";
import {SuperAdminGuard} from "./superAdmin-guard.service";
import {LogoutComponent} from "./logout/logout.component";
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";
import {TransactionComponent} from "./transaction/transaction.component";
import {AdminPaymentsComponent} from "./admin-payments/admin-payments.component";
import {MyprofileComponent} from "./myprofile/myprofile.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";



const routes: Routes=[

  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'enrollpark',
    component: ParkformComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'adminPanel',
    component: AdminPanelComponent,
    canActivate: [SuperAdminGuard]
  },
  {
    path: 'transaction',
    component: TransactionComponent,
    canActivate: [SuperAdminGuard]
  },
  {
    path: 'payments',
    component: AdminPaymentsComponent,
    canActivate: [AdminGuard]
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'park',
    component: ParkComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'myProfile',
    component: MyprofileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'userProfile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  }

]

@NgModule({
    imports:[
      RouterModule.forRoot(routes)
    ],
    exports:[
      RouterModule
    ]
  })
export class AppRoutingModule{}
export const routingComponents =[LoginComponent,RegisterComponent, ParkComponent,ParkformComponent, HomeComponent]
