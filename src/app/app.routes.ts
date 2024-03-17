import { Routes } from '@angular/router';
import { AddBirthdayComponent } from './add-birthday/add-birthday.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: 'add-birthday', component: AddBirthdayComponent },
    { path: 'home', component: HomeComponent },
    { path: '**', component: HomeComponent }
];
