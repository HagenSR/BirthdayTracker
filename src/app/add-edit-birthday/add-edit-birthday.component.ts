import { Component, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BirthdayService } from '../shared/services/birthday/birthday.service';
import { Birthday } from '../shared/models/birthday.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, filter, map, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InputTextareaModule } from 'primeng/inputtextarea';

/* eslint-disable  @typescript-eslint/no-explicit-any */
@Component({
  selector: 'app-add-birthday',
  standalone: true,
  imports: [PanelModule, InputTextModule, CalendarModule, ReactiveFormsModule, RouterModule, CommonModule, InputTextareaModule],
  templateUrl: './add-edit-birthday.component.html',
  styleUrl: './add-edit-birthday.component.scss'
})
export class AddEditBirthdayComponent implements OnInit {

  form = this.formBuilder.group({
    id: -1,
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    birthDay: [null, [Validators.required]],
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

  birthday$ = this.id$.pipe(
    switchMap((id) => this.birthdayService.query.selectEntity(id)),
    filter((birthday) => Boolean(birthday))
  ) as Observable<Birthday>

  constructor(private readonly formBuilder: FormBuilder,
    private birthdayService: BirthdayService,
    private router: Router,
    private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.birthday$.pipe(
      tap((birthday) => this.form.setValue(birthday as any))
    )
    .subscribe()
  }

  add() {
    if (this.form.valid) {
      const birthday: Birthday = this.form.value as unknown as Birthday
      this.birthdayService.addBirthday(birthday)
      this.router.navigate(['/home'])
    }
  }

}
