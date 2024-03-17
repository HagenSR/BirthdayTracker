import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BirthdayService } from '../shared/services/birthday/birthday.service';
import { Birthday } from '../shared/models/birthday.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-birthday',
  standalone: true,
  imports: [PanelModule, InputTextModule, CalendarModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-birthday.component.html',
  styleUrl: './add-birthday.component.scss'
})
export class AddBirthdayComponent {

  form = this.formBuilder.group({
    id: 0,
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    birthDay: [null, [Validators.required]],
  })

  constructor(private readonly formBuilder: FormBuilder,
    private birthdayService: BirthdayService,
    private router: Router) {
  }

  add() {
    if (this.form.valid) {
      const birthday: Birthday = this.form.value as unknown as Birthday
      this.birthdayService.addBirthday(birthday)
      this.router.navigate(['/home'])
    }
  }

}
