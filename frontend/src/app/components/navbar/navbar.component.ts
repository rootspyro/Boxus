import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbDropdownModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isLogged = false;

  constructor(private router: Router, private readonly supabase: SupabaseService) {}

  ngOnInit(): void {
    if(this.supabase.session?.user) this.isLogged = true;
    else this.router.navigate(["/login"]);
  }

  async ngLogout(): Promise<void> {
    await this.supabase.signOut();
    this.router.navigate(["/login"]);
  }
}
