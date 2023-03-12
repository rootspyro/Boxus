import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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

  constructor(
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.dragAreaClass = 'dragarea';
    this.secretForm = this.initForm();
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
    const regExp = '([^\\s]+(\\.(?i)(jpe?g|png|gif|bmp))$)';

    if (files.length > 1) this.error = 'Sólo se permite 1 imagen';
    else if (!regExp.match(files[0].name)) this.error = 'Sólo se permiten imágenes';
    else {
      this.error = '';
      this.draggedFiles = files;
    }
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      secretTitle: ['', [Validators.required, Validators.minLength(3)]],
      secretContent: ['', [Validators.required, Validators.minLength(3)]],
      draggedFiles: ['']
    });
  }

  sendSecret(): void {
    if(this.secretForm.valid) {
      console.log(this.secretForm.value);
    } else {
      console.error('Los campos son inválidos')
    }

  }
}
