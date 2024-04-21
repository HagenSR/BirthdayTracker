import { Routes } from '@angular/router';
import { AddEditCalendarEventComponent } from './add-edit-calendar-event/add-edit-calendar-event.component';
import { HomeComponent } from './home/home.component';
import { PersonComponent } from './person/person.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
    { path: 'add-edit-event', component: AddEditCalendarEventComponent },
    { path: 'home', component: HomeComponent },
    { path: 'person', component: PersonComponent },
    { path: 'settings', component: SettingsComponent },
    { path: '**', redirectTo: 'home' }
];
