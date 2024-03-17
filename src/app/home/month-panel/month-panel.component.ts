import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BirthdayService } from '../../shared/services/birthday/birthday.service';
import { BirthdayPanelComponent } from "./birthday-panel/birthday-panel.component";
import { MonthPipe } from "../../shared/pipes/month.pipe";
import { TimePeriodDuration } from '../../shared/enums/time-period-duration.enum';
import { RemoveUnderscores } from "../../shared/pipes/remove-underscores.pipe";

@Component({
  selector: 'app-month-panel',
  standalone: true,
  templateUrl: './month-panel.component.html',
  styleUrl: './month-panel.component.scss',
  imports: [CommonModule, BirthdayPanelComponent, MonthPipe, RemoveUnderscores]
})
export class MonthPanelComponent {

  @Input() timePeriodDuration!: TimePeriodDuration;

  constructor(readonly birthdayService: BirthdayService) {
  }

}
