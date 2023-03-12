import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MySecretsService } from 'src/app/services/my-secrets.service';

@Component({
  selector: 'app-my-secrets',
  templateUrl: './my-secrets.component.html',
  styleUrls: ['./my-secrets.component.scss'],
})
export class MySecretsComponent {
  mySecrets$ = this.mySecretsSvc.mySecrets$;

  constructor(private mySecretsSvc: MySecretsService) {}
}
