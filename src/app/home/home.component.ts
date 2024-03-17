import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { MonthPanelComponent } from "./month-panel/month-panel.component";
import { CommonModule } from '@angular/common';
import { BirthdayService } from '../shared/services/birthday/birthday.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [ButtonModule, RouterModule, MonthPanelComponent, CommonModule]
})
export class HomeComponent {

    constructor(readonly birthdayService: BirthdayService) {

    }
}
