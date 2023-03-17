import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor() {}

  isLoggedUser(): boolean {
    return localStorage.length > 0;
  }

  logoutUser(): void {
    localStorage.clear();
  }
}
