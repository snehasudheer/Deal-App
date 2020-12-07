import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DealListComponent } from './deal/deal-list/deal-list.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { OrganisationsComponent } from './organisations/organisations.component';
import { DealCatagoryComponent } from './deal/deal-catagory/deal-catagory.component';
import { DealCreateComponent } from './deal/deal-create/deal-create.component';
import { DealComponent } from './deal/deal.component';
import { DealEditComponent } from './deal/deal-edit/deal-edit.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersCreateComponent } from './users/users-create/users-create.component';
import { OrganisationListComponent } from './organisations/organisation-list/organisation-list.component';
import { OrganisationsCreateComponent } from './organisations/organisations-create/organisations-create.component';
import { OrganisationsEditComponent } from './organisations/organisations-edit/organisations-edit.component';
import { DealPreviewComponent } from './deal/deal-preview/deal-preview.component';
import { DealShopComponent } from './deal/deal-shop/deal-shop.component';
import { RoleGuardService } from './auth/auth-role-guard.service';
 
const routes: Routes = [
  { path:"",redirectTo:'/home',pathMatch:'full'},
  { path:'home',component:DashboardComponent},
  { path: 'login', component: LoginComponent },
  { path: 'deal', component: DealComponent },
  { path: 'deal/deal-list', component: DealListComponent,canActivate:[AuthGuardService]},
  { path: 'deal/deal-create', component: DealCreateComponent,canActivate:[AuthGuardService]},
  { path: 'deal/deal-preview/:id', component: DealPreviewComponent,canActivate:[AuthGuardService]},
  { path: 'deal/deal-shop/:id', component: DealShopComponent,canActivate:[AuthGuardService]},
   { path: 'deal/deal-edit/:id', component: DealCreateComponent,canActivate:[AuthGuardService]},
  


  // { path: 'deal', component: DealComponent ,children: [
  //   { path: '', redirectTo: 'deal-list', pathMatch: 'full' },
  //   { path: 'deal-list', component: DealListComponent},
  //   { path: 'deal-create', component: DealCreateComponent,canActivate:[AuthGuardService]},
  //   { path: 'deal-edit/:id', component: DealEditComponent,canActivate:[AuthGuardService]},
  // ]},
  { path: 'users', component: UsersComponent ,children: [
    { path: '', redirectTo: 'deal-list', pathMatch: 'full' },
    { path: 'user-list', component: UsersListComponent,canActivate:[AuthGuardService]},
    { path: 'user-create', component: UsersCreateComponent,canActivate:[AuthGuardService]},
   
  ]},
  { path: 'deal-catagory', component: DealCatagoryComponent,canActivate:[AuthGuardService] },
  { path: 'organisations', component: OrganisationsComponent ,children: [
    { path: '', redirectTo: 'organisation-list', pathMatch: 'full' },
    { path: 'organisation-list', component:OrganisationListComponent,canActivate:[AuthGuardService,RoleGuardService],data: {roles: ['appadmin']}  },
    { path: 'organisation-create', component:OrganisationsCreateComponent,canActivate:[AuthGuardService,RoleGuardService],data: {roles: ['appadmin']}  },
    { path: 'organisation-edit/:id', component:OrganisationsEditComponent,canActivate:[AuthGuardService,RoleGuardService],data: {roles: ['appadmin']}  },

  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
