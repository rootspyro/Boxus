import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionsGuard implements CanActivate {
  constructor(private authSvc: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (!this.hasUser()) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }

  hasUser(): boolean {
    return this.authSvc.isLoggedUser();
  }
}
