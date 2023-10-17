import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home.component/home.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login.component/login.component';
import { RegisterComponent } from './register.component/register.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ClientComponent } from './client/client.component'; 
import { CompanyComponent } from './company/company.component';
import { RoleGuard } from './authGuard/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'client', component:ClientComponent, canActivate: [RoleGuard], data: { expectedRoles: ['client', 'sysAdmin'] }},
  {path:'company', component:CompanyComponent, canActivate: [RoleGuard], data: { expectedRoles: ['company', 'sysAdmin'] }},
  {path:'dashboard', component:ClientComponent, canActivate: [RoleGuard], data: { expectedRoles: ['client', 'sysAdmin'] }}

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
    DashboardComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    
    [RouterModule.forRoot(routes)]
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
