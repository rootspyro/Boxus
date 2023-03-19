import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { Observable, Subject } from 'rxjs';
import { environment } from './environments/environment';
import { AuthService } from './services/auth.service';

export interface Profile {
  id?: string;
  username: string;
  website: string;
  avatar_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  _session: AuthSession | null = null;

  constructor(
    private httpClient: HttpClient,
    private readonly authSvc: AuthService
  ) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single();
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  signInWithGoogle() {
    return this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: "http://localhost:4200/",
      }
    });
  }

  signInWithFacebook() {
    return this.supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: "http://localhost:4200/",
      }
    });
  }

  signInWithGitHub() {
    return this.supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  }

  signUp(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password });
  }

  // signIn(email: string) {
  //   return this.supabase.auth.signInWithOtp({ email })
  // }

  signOut() {
    this.authSvc.logoutUser();
    return this.supabase.auth.signOut();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    };

    return this.supabase.from('profiles').upsert(update);
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file);
  }

  uploadImage(file: Blob) {

    return this.httpClient
      .post(environment.supabaseEndpointImg, file)
      .subscribe(res => console.log(res));
    // fetch(environment.supabaseEndpointImg, {
    //   method: 'POST',
    //   body: file,
    // })
    //   .then((res) => res.text())
    //   .catch((err) => console.log(err));

  }
}
