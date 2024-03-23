import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { Observable, filter, map, switchMap } from 'rxjs';
import { BirthdayService } from '../shared/services/birthday/birthday.service';
import { InitialsPipe } from "../shared/pipes/initials.pipe";
import { AvatarModule } from 'primeng/avatar';
import { Birthday } from '../shared/models/birthday.model';
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

  birthday$ = this.id$.pipe(
    switchMap((id) => this.birthdayService.query.selectEntity(id)),
    filter((birthday) => Boolean(birthday))
  ) as Observable<Birthday>
  
  constructor(private route: ActivatedRoute,
    private birthdayService: BirthdayService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private rerun: RerunObservableService) { 
    }

  deleteBirthday(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.birthdayService.delete(this.id)
        this.router.navigate(['/home'])
      }
    });
  }
}
