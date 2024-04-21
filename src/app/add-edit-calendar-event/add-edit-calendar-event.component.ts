import { Component, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarEventService } from '../shared/services/calendar-event/calendar-event.service';
import { CalendarEvent } from '../shared/models/calendar-event.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, filter, map, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InputTextareaModule } from 'primeng/inputtextarea';

/* eslint-disable  @typescript-eslint/no-explicit-any */
@Component({
  selector: 'app-add-edit-calendar-event',
  standalone: true,
  imports: [PanelModule, InputTextModule, CalendarModule, ReactiveFormsModule, RouterModule, CommonModule, InputTextareaModule],
  templateUrl: './add-edit-calendar-event.component.html',
  styleUrl: './add-edit-calendar-event.component.scss'
})
export class AddEditCalendarEventComponent implements OnInit {

  form = this.formBuilder.group({
    id: -1,
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    eventName: ['Birthday', [Validators.required]],
    date: [null, [Validators.required]],
    notes: ['', []],
  })

  id = -1
  phrase = 'Add'

  id$ = this.route.paramMap.pipe(
    map(params => {
      if(params.has('id')){
        this.id = Number(params.get('id'))
        this.phrase = 'Edit'
      }
      return this.id;
    })
  )

  event$ = this.id$.pipe(
    switchMap((id) => this.eventService.query.selectEntity(id)),
    filter((event) => Boolean(event))
  ) as Observable<CalendarEvent>

  constructor(private readonly formBuilder: FormBuilder,
    private eventService: CalendarEventService,
    private router: Router,
    private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.event$.pipe(
      tap((event) => this.form.setValue(event as any))
    )
    .subscribe()
  }

  add() {
    if (this.form.valid) {
      const event: CalendarEvent = this.form.value as unknown as CalendarEvent
      this.eventService.addEvent(event)
      this.router.navigate(['/home'])
    }
  }

}
