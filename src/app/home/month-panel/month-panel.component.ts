import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CalendarEventService } from '../../shared/services/calendar-event/calendar-event.service';
import { CalendarEventPanelComponent } from "./calendar-event-panel/calendar-event-panel.component";
import { MonthPipe } from "../../shared/pipes/month.pipe";
import { TimePeriodDuration } from '../../shared/enums/time-period-duration.enum';
import { RemoveUnderscores } from "../../shared/pipes/remove-underscores.pipe";

@Component({
  selector: 'app-month-panel',
  standalone: true,
  templateUrl: './month-panel.component.html',
  styleUrl: './month-panel.component.scss',
  imports: [CommonModule, CalendarEventPanelComponent, MonthPipe, RemoveUnderscores]
})
export class MonthPanelComponent {

  @Input() timePeriodDuration!: TimePeriodDuration;

  constructor(readonly eventService: CalendarEventService) {
  }

}
