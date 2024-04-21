import { Component, Input } from '@angular/core';
import { CalendarEvent } from '../../../shared/models/calendar-event.model';
import { CommonModule } from '@angular/common';
import { HowOldPipe } from "../../../shared/pipes/how-old.pipe";
import { DaysUntilPipe } from "../../../shared/pipes/days-until.pipe";
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { InitialsPipe } from "../../../shared/pipes/initials.pipe";
import { RouterModule } from '@angular/router';
import { RerunObservableService } from '../../../shared/services/Rerun/rerun-observable.service';

@Component({
    selector: 'app-calendar-event-panel',
    standalone: true,
    templateUrl: './calendar-event-panel.component.html',
    styleUrl: './calendar-event-panel.component.scss',
    imports: [CommonModule, HowOldPipe, DaysUntilPipe, ButtonModule, AvatarModule, InitialsPipe, RouterModule]
})
export class CalendarEventPanelComponent {

  @Input() event!: CalendarEvent

  currentDate$ = this.rerun.currentDate$;

  constructor(private rerun: RerunObservableService){
  }

}
