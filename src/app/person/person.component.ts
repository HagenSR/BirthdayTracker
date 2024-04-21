import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { Observable, filter, map, switchMap } from 'rxjs';
import { CalendarEventService } from '../shared/services/calendar-event/calendar-event.service';
import { InitialsPipe } from "../shared/pipes/initials.pipe";
import { AvatarModule } from 'primeng/avatar';
import { CalendarEvent } from '../shared/models/calendar-event.model';
import { HowOldPipe } from "../shared/pipes/how-old.pipe";
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RerunObservableService } from '../shared/services/Rerun/rerun-observable.service';

@Component({
  selector: 'app-person',
  standalone: true,
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss',
  imports: [ButtonModule,
    RouterModule,
    ToolbarModule,
    CommonModule,
    InitialsPipe,
    AvatarModule,
    CommonModule,
    HowOldPipe,
    ConfirmPopupModule,
    ToastModule],
  providers: [ConfirmationService]
})
export class PersonComponent {

  id: number = -1;

  now$ = this.rerun.currentDate$

  id$ = this.route.paramMap.pipe(
    map(params => {
      this.id = Number(params.get('id'))
      return this.id;
    })
  )

  event$ = this.id$.pipe(
    switchMap((id) => this.eventService.query.selectEntity(id)),
    filter((event) => Boolean(event))
  ) as Observable<CalendarEvent>
  
  constructor(private route: ActivatedRoute,
    private eventService: CalendarEventService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private rerun: RerunObservableService) { 
    }

  deleteEvent(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eventService.delete(this.id)
        this.router.navigate(['/home'])
      }
    });
  }
}
