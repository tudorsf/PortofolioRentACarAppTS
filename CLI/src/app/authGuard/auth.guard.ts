import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class RoleGuard  {
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
