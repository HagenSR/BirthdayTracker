
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-home-bar',
    standalone: true,
    imports: [ButtonModule, RouterModule],
    templateUrl: './home-bar.component.html',
    styleUrl: './home-bar.component.scss'
})
export class HomeBarComponent {

}
