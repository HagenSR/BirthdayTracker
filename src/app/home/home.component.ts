import { Component } from '@angular/core';
import { MonthPanelComponent } from "./month-panel/month-panel.component";
import { CommonModule } from '@angular/common';
import { CalendarEventService } from '../shared/services/calendar-event/calendar-event.service';
import { HomeBarComponent } from "../home-bar/home-bar.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [MonthPanelComponent, CommonModule, HomeBarComponent]
})
export class HomeComponent {

    constructor(readonly eventService: CalendarEventService) {
        
    }
}
