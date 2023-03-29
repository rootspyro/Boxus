import { Component, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SupabaseService } from 'src/app/supabase.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbDropdownModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements DoCheck {
  isLogged: boolean;
  username!: string;

  constructor(
    private router: Router,
    private readonly supabase: SupabaseService,
    private readonly authSvc: AuthService
  ) {
    this.isLogged = this.authSvc.isLoggedUser();
    if (this.isLogged) {
      this.username = this.authSvc.loggedUser.user.email;
    }
  }

  ngOnInit(): void {
    if (!this.isLogged) this.router.navigate(['/login']);
  }

  ngDoCheck(): void {
    this.isLogged = this.authSvc.isLoggedUser();
    if (this.isLogged) {
      this.username = this.authSvc.loggedUser.user.email;
    }
  }

  async ngLogout(): Promise<void> {
    await this.supabase.signOut();
    this.router.navigate(['/login']);
  }
}
