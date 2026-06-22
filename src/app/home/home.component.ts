import { Component } from '@angular/core';
import { MonthPanelComponent } from "./month-panel/month-panel.component";
import { CommonModule } from '@angular/common';
import { CalendarEventService } from '../shared/services/calendar-event/calendar-event.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [MonthPanelComponent, CommonModule]
})
export class HomeComponent {

    constructor(readonly eventService: CalendarEventService) {
        
    }
}
