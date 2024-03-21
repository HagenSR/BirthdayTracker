import { Routes } from '@angular/router';
import { AddEditBirthdayComponent } from './add-edit-birthday/add-edit-birthday.component';
import { HomeComponent } from './home/home.component';
import { PersonComponent } from './person/person.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
    { path: 'add-birthday', component: AddEditBirthdayComponent },
    { path: 'home', component: HomeComponent },
    { path: 'person', component: PersonComponent },
    { path: 'settings', component: SettingsComponent },
    { path: '**', redirectTo: 'home' }
];
