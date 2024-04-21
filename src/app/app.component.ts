import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { HomeBarComponent } from "./home-bar/home-bar.component";
import { RerunObservableService } from './shared/services/Rerun/rerun-observable.service';
import { ElevatorService } from './shared/services/elevator/elevator.service';
import { ThemeService } from './shared/services/theme/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HomeComponent, HomeBarComponent]
})
export class AppComponent implements OnInit {

  title = 'BirthdayTracker';

  constructor(private rerunService: RerunObservableService,
              private elevator: ElevatorService,
              private themeService: ThemeService  
  ) {
  }

  ngOnInit(): void {
    window.onfocus = () => {
      this.rerunService.manualRetrigger.next(Date.now());
    }
  }
}
