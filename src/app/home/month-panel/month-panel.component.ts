import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BirthdayService } from '../../shared/services/birthday/birthday.service';
import { BirthdayPanelComponent } from "./birthday-panel/birthday-panel.component";
import { Observable, map } from 'rxjs';
import { Birthday } from '../../shared/models/birthday.model';
import { MonthPipe } from "../../shared/pipes/month.pipe";

@Component({
  selector: 'app-month-panel',
  standalone: true,
  templateUrl: './month-panel.component.html',
  styleUrl: './month-panel.component.scss',
  imports: [CommonModule, BirthdayPanelComponent, MonthPipe]
})
export class MonthPanelComponent implements OnInit {

  birthdays$!: Observable<Birthday[]>

  @Input() month!: number;

  constructor(private readonly birthdayService: BirthdayService) {
  }

  ngOnInit(): void {
    this.birthdays$ = this.birthdayService.query.selectAll().pipe(
      map((birthdayList) => birthdayList?.filter((birthday) => birthday.birthDay.getMonth() === this.month))
    )
  }

}
