import { Component, Input } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { fullSecret } from 'src/app/interfaces/secret';

@Component({
  selector: 'app-secret',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.scss']
})
export class SecretComponent {
  @Input() secret!: fullSecret;

  formatDate(date: string): string {
    let formatedDate = formatDate(date, 'd/M/yy, h:mm a', 'en-US');

    return formatedDate;
  }
}
