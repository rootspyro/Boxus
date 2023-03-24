import { Component, DoCheck } from '@angular/core';
import { MySecretsService } from 'src/app/services/my-secrets.service';

@Component({
  selector: 'app-my-secrets',
  templateUrl: './my-secrets.component.html',
  styleUrls: ['./my-secrets.component.scss'],
})
export class MySecretsComponent implements DoCheck {
  mySecrets$ = this.mySecretsSvc.allSecrets;

  constructor(private mySecretsSvc: MySecretsService) {}

  ngDoCheck(): void {
    this.mySecrets$ = this.mySecretsSvc.allSecrets;
  }
}
