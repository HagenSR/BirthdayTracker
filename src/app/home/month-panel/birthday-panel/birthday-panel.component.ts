import { Component, Input } from '@angular/core';
import { Birthday } from '../../../shared/models/birthday.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-birthday-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './birthday-panel.component.html',
  styleUrl: './birthday-panel.component.scss'
})
export class BirthdayPanelComponent {

  @Input() birthday!: Birthday
}
