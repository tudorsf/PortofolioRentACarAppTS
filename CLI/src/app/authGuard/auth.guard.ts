import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/*@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getCurrentUser(); // Replace with your authentication logic

    if (user && user.role === 'client') {
      return true; // Client is allowed to access the route
    } else if (user && user.role === 'company') {
      this.router.navigate(['/company-page']); // Redirect to the company page
      return false; // Company is not allowed to access the route
    } else {
      this.router.navigate(['/login']); // Redirect to the login page if the user is not authenticated
      return false; // User is not allowed to access the route
    }
  }
}
*/