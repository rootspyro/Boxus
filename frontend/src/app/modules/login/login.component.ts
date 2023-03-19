import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SupabaseService } from 'src/app/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {
  loading = false;
  isLogging = true;

  loginForm = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(32),
    ]),
  })

  constructor(
    private readonly supabase: SupabaseService,
    private router: Router,
  ) {}

  async signInWithGoogle(): Promise<void> {
    try {
      this.loading = true
      const { data, error } = await this.supabase.signInWithGoogle();
      console.log(data);
      if (error) throw error
      this.router.navigateByUrl('/')
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.loginForm.reset()
      this.loading = false
    }
  }

  async signInWithFacebook(): Promise<void> {
    try {
      this.loading = true
      const { data, error } = await this.supabase.signInWithFacebook();
      console.log(data);
      if (error) throw error
      this.router.navigateByUrl('/')
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.loginForm.reset()
      this.loading = false
    }
  }

  async signInWithGitHub(): Promise<void> {
    try {
      this.loading = true
      const { data, error } = await this.supabase.signInWithGitHub();
      console.log(data);
      if (error) throw error
      this.router.navigateByUrl('/')
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.loginForm.reset()
      this.loading = false
    }
  }

  async signIn(): Promise<void> {
    try {
      this.loading = true
      const email = this.loginForm.value.email as string
      const password = this.loginForm.value.password as string
      const { data, error } = await this.supabase.signIn(email, password);
      console.log(data);
      if (error) throw error
      this.router.navigateByUrl('/')
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.loginForm.reset()
      this.loading = false
    }
  }

  async signUp(): Promise<void> {
    try {
      this.loading = true
      const email = this.loginForm.value.email as string
      const password = this.loginForm.value.password as string
      const { error } = await this.supabase.signUp(email, password);
      if (error) throw error
      alert('Check your email for the registration link!')
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.loginForm.reset()
      this.loading = false
    }
  }

  toggleIsLogging(): void {
    this.isLogging = !this.isLogging;
  }
}
