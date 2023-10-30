import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = route.data['expectedRoles'];
    
    const currentUser = this.authService.getCurrentUser();
    
    if (currentUser && expectedRoles.includes(currentUser.role)) {
      return true;
    }

   
    this.router.navigate(['/access-denied']);
    return false;
  }
}
