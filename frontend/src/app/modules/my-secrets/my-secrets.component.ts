import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { FullSecret } from './../../interfaces/secret';
import { MySecretsService } from '../../services/my-secrets.service';

@Component({
  selector: 'app-my-secrets',
  templateUrl: './my-secrets.component.html',
  styleUrls: ['./my-secrets.component.scss'],
})
export class MySecretsComponent implements OnDestroy {
  mySecrets$: Observable<FullSecret[]>;
  private offset = 0;

  constructor(private mySecretsSvc: MySecretsService) {
    this.mySecretsSvc.updateSecrets = this.offset;
    this.mySecrets$ = this.mySecretsSvc.secrets$;
  }

  onScrolledFeed(): void {
    this.offset++
    this.mySecretsSvc.updateSecrets = this.offset * 10;
  }

  ngOnDestroy(): void {
    this.mySecretsSvc.clearSecrets();
  }
}
