import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Secret } from 'src/app/interfaces/secret';
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
    private mySecretsSvc: MySecretsService,
    private supabaseSvc: SupabaseService
  ) {}

  ngOnInit(): void {
    this.dragAreaClass = 'dragarea';
    this.secretForm = this.initForm();
  }

  ngAfterViewInit(): void {
    this.user_id = this.supabaseSvc.session?.user.id;
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
        const formatedSecret = this.formatSecret(this.secretForm.value);
        // this.mySecretsSvc.postSecret(formatedSecret);
        console.log(this.formatSecret(this.secretForm.value));
      } else {
        console.error('Los campos son inválidos');
      }
    } catch (err) {
      console.error(err);
    }
  }

  private formatSecret(secret: any) {
    const imgBlob = new Blob(this.draggedFiles, {type: this.draggedFiles[0].type});
    const imgUrl = this.supabaseSvc.uploadImage(imgBlob);

    const newSecret = {
      title: secret.secretTitle,
      content: secret.secretContent,
      media_url: imgUrl,
      user_id: this.user_id,
    } as Secret;

    return newSecret;
  }
}
