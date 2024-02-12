import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home.component/home.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login.component/login.component';
import { RegisterComponent } from './register.component/register.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CompanyComponent } from './company/company.component';
import { RoleGuard } from './authGuard/auth.guard';
import { ErrorModalComponent } from './shared/error-modal/error-modal.component';
import { ClientComponent } from './client/client.component';
import { AccesDeniedComponent } from './acces.denied/access-denied.component';
import { ProfileModalComponent } from './company/profile-modal/profile-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddCarComponent } from './company/add-car/add-car.component';
import { ReservationsModalComponent } from './company/reservations-modal/reservations-modal.component';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { CustomerService } from './services/customer.service';
import { NoProfileComponent } from './noProfile.component/noProfile.component';
import { CliProfileModalComponent } from './client/CliProfile/cliProfile-modal.component';
import { LoaderComponent } from './loader.component/loader.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path:'client', component:ClientComponent, canActivate: [RoleGuard], data: { expectedRoles: ['client', 'sysAdmin'] }},
  {path:'company', component:CompanyComponent, canActivate: [RoleGuard], data: { expectedRoles: ['company', 'sysAdmin'] }},
  {path:'modal', component:ErrorModalComponent },
  {path: 'access-denied', component:AccesDeniedComponent},
  {path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'add-car', component:AddCarComponent, data: { expectedRoles: ['company', 'sysAdmin']} }
 /*{path:'load', component: LoaderComponent}*/

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CompanyComponent,
    ClientComponent,
    CompanyComponent,
    ErrorModalComponent,
    AccesDeniedComponent,
    ProfileModalComponent,
    AddCarComponent,
    ReservationsModalComponent,
    NoProfileComponent,
    LoaderComponent

    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTooltipModule,
    [RouterModule.forRoot(routes)],
    NgbModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule
  ],
  exports: [RouterModule],
  providers: [CustomerService],
  bootstrap: [AppComponent],
})
export class AppModule { }
