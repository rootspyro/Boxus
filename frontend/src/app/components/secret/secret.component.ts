import { Component, Input } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';

@Component({
  selector: 'app-secret',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.scss']
})
export class SecretComponent {
  @Input() secret!: any

  formatDate(date: string): string {
    let formatedDate = formatDate(date, 'M/d/yy, h:mm a', 'es-VE');

    return formatedDate;
  }
}
