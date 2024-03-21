import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home-bar',
  standalone: true,
  imports: [ButtonModule, RouterModule, CommonModule],
  templateUrl: './home-bar.component.html',
  styleUrl: './home-bar.component.scss'
})
export class HomeBarComponent {

}
