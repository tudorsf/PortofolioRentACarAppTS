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


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path:'client', component:ClientComponent, canActivate: [RoleGuard], data: { expectedRoles: ['client', 'sysAdmin'] }},
  {path:'company', component:CompanyComponent, canActivate: [RoleGuard], data: { expectedRoles: ['company', 'sysAdmin'] }},
  {path:'modal', component:ErrorModalComponent },
  {path: 'access-denied', component:AccesDeniedComponent},
  {path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
 

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
    ProfileModalComponent

    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    [RouterModule.forRoot(routes)]
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
