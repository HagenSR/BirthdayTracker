import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { MonthPanelComponent } from "./month-panel/month-panel.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [ButtonModule, RouterModule, MonthPanelComponent, CommonModule]
})
export class HomeComponent implements OnInit {
    months: number[] = []

    ngOnInit(): void {
        const curMonth = new Date().getMonth()
        for (let i = 0; i < 12; i++) {
            this.months.push((curMonth + i) % 12)
        }
    }
}
