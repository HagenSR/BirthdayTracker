import { Component, Input } from '@angular/core';
import { Birthday } from '../../../shared/models/birthday.model';
import { CommonModule } from '@angular/common';
import { HowOldPipe } from "../../../shared/pipes/how-old.pipe";
import { DaysUntilPipe } from "../../../shared/pipes/days-until.pipe";
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { InitialsPipe } from "../../../shared/pipes/initials.pipe";
import { RouterModule } from '@angular/router';
import { RerunObservableService } from '../../../shared/services/Rerun/rerun-observable.service';

@Component({
    selector: 'app-birthday-panel',
    standalone: true,
    templateUrl: './birthday-panel.component.html',
    styleUrl: './birthday-panel.component.scss',
    imports: [CommonModule, HowOldPipe, DaysUntilPipe, ButtonModule, AvatarModule, InitialsPipe, RouterModule]
})
export class BirthdayPanelComponent {

  @Input() birthday!: Birthday

  currentDate$ = this.rerun.currentDate$;

  constructor(private rerun: RerunObservableService){
  }

}
