import { Component, isDevMode } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { HomeBarComponent } from "../home-bar/home-bar.component";
import { ThemeService } from '../shared/services/theme/theme.service';
import { VersionService } from '../shared/services/version/version.service';
import { Version } from '../shared/enums/version.enum';

@Component({
  selector: 'app-settings',
  standalone: true,
  providers: [MessageService],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  imports: [ButtonModule, ToastModule, HomeBarComponent, ToggleButtonModule]
})
export class SettingsComponent {

  constructor(readonly messageService: MessageService, 
     private themeService: ThemeService,
     private versionService: VersionService) {

  }

  exportEvents() {
    const link = document.createElement('a');
    let store = localStorage.getItem('AkitaStores')
    link.setAttribute('target', '_blank');
    const blob = new Blob([store ?? ''], { type: 'application/json' });
    const fileUrl = URL.createObjectURL(blob);
    link.setAttribute('href', fileUrl);
    link.setAttribute('download', `events_${new Date().toISOString()}.json`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  importEvents($event: any) {
    this.versionService.updateVersion(Version.one)
    const file: File = $event.target.files[0];
    const reader = new FileReader();
    reader.onload = function fileReadCompleted() {
      console.log(reader.result);
      localStorage.setItem('AkitaStores', reader?.result?.toString() ?? '')
      window.location.href = isDevMode() ? 'http://localhost:4200' : 'https://hagensr.github.io/BirthdayTracker';
    };
    reader.readAsText(file);
  }

  changeTheme() {
    this.themeService.toggleTheme()
  }

  yippee() {
    alert('yippee!')
  }

}
