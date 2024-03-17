import { Component, Input } from '@angular/core';
import { Birthday } from '../../../shared/models/birthday.model';
import { CommonModule } from '@angular/common';
import { HowOldPipe } from "../../../shared/pipes/how-old.pipe";
import { DaysUntilPipe } from "../../../shared/pipes/days-until.pipe";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-birthday-panel',
  standalone: true,
  templateUrl: './birthday-panel.component.html',
  styleUrl: './birthday-panel.component.scss',
  imports: [CommonModule, HowOldPipe, DaysUntilPipe, ButtonModule]
})
export class BirthdayPanelComponent {

  @Input() birthday!: Birthday
}
