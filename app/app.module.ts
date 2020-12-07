import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { AuthGuardService } from './auth/auth-guard.service';
import { DealService } from './deal/deal.service';
import { Interceptor } from './interceptors/token.interceptor';
import { AppHttpInterceptor } from './interceptors/http.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersCreateComponent } from './users/users-create/users-create.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DealModule } from './deal/deal.module';
import { OrganisationsModule } from './organisations/organisations.module';
import { FooterComponent } from './footer/footer.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderModule } from 'ngx-order-pipe';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleGuardService } from './auth/auth-role-guard.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    UsersComponent,
    UsersListComponent,
    UsersCreateComponent,
    FooterComponent
    
   
  ],
 

  imports: [
    BrowserModule,
    OrderModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    DealModule,
    OrganisationsModule,
    NgMultiSelectDropDownModule.forRoot(),
    BrowserAnimationsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
 
    
    
  ],
  providers: [
    AuthService,
    CookieService,
    AuthGuardService,
    RoleGuardService,
    DealService,
    NgbActiveModal,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: MatDialog, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
   ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
