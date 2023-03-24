import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, of, take, tap } from 'rxjs';
import { Secret } from 'src/app/interfaces/secret';
import { AuthService } from 'src/app/services/auth.service';
import { MySecretsService } from 'src/app/services/my-secrets.service';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-new-secret',
  templateUrl: './new-secret.component.html',
  styleUrls: ['./new-secret.component.scss'],
})
export class NewSecretComponent {
  error!: string;
  dragAreaClass!: string;
  draggedFiles!: any;
  secretForm!: FormGroup;
  private user_id: string | undefined;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private mySecretsSvc: MySecretsService,
    private backendSvc: SupabaseService,
    private authSvc: AuthService
  ) {}

  ngOnInit(): void {
    this.dragAreaClass = 'dragarea';
    this.secretForm = this.initForm();
  }

  ngAfterViewInit(): void {
    this.user_id = this.authSvc.loggedUser.user.id;
  }

  @HostListener('dragover', ['$event']) onDragOver(event: any) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }

  @HostListener('dragenter', ['$event']) onDragEnter(event: any) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }

  @HostListener('dragend', ['$event']) onDragEnd(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }

  @HostListener('drop', ['$event']) onDrop(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      let files: FileList = event.dataTransfer.files;
      this.saveFiles(files);
    }
  }

  onFileChange(event: any) {
    let files: FileList = event.target.files;
    this.saveFiles(files);
  }

  saveFiles(files: FileList) {
    if (files.length > 1) {
      this.error = 'Sólo se permite 1 imagen';
      console.log(files);
    } else if (!files[0].type.includes('image'))
      this.error = 'Sólo se permiten imágenes';
    else {
      this.error = '';
      this.draggedFiles = files;
    }
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      secretTitle: ['', [Validators.required, Validators.minLength(3)]],
      secretContent: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  sendSecret() {
    try {
      if (this.secretForm.valid) {
        this.formatSecret(this.secretForm.value)
          .pipe(
            take(1),
            tap((secret: Secret) => {
              console.log(secret);
              this.mySecretsSvc.postSecret(secret);
              this.router.navigate(['my-secrets']);
            })
          )
          .subscribe();
      } else {
        this.error =
          'Algo ha fallado al subir tu secreto. Inténtalo nuevamente';
      }
    } catch (err) {
      console.error(err);
    }
  }

  formatSecret(secret: any): Observable<Secret> {
    const newSecret = {
      title: secret.secretTitle,
      content: secret.secretContent,
      media_url: '',
      user_id: this.user_id,
    } as Secret;

    if (this.draggedFiles) {
      const imgBlob = new Blob(this.draggedFiles, {
        type: this.draggedFiles[0].type,
      });

      return this.backendSvc.uploadImage(imgBlob).pipe(
        take(1),
        map((res: string) => {
          const img = res.split('&token')[0];
          newSecret.media_url = img;
          return newSecret;
        })
      );
    } else {
      return of(newSecret);
    }
  }
}
