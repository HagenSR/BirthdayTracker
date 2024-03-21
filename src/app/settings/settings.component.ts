import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { HomeBarComponent } from "../home-bar/home-bar.component";

@Component({
    selector: 'app-settings',
    standalone: true,
    providers: [MessageService],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss',
    imports: [ButtonModule, ToastModule, HomeBarComponent]
})
export class SettingsComponent {

  constructor(readonly messageService: MessageService){

  }

  exportBirthdays(){
    const link = document.createElement('a');
    const store = localStorage.getItem('AkitaStores')
    link.setAttribute('target', '_blank');
    const blob = new Blob([store ?? ''], { type: 'application/json' });
    const fileUrl = URL.createObjectURL(blob);
    link.setAttribute('href', fileUrl);
    link.setAttribute('download', `birthdays_${new Date().toISOString()}.json`);
    document.body.appendChild(link);
    link.click();
    link.remove();
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
importBirthdays($event: any){
  const file: File = $event.target.files[0];
  const reader = new FileReader();
  reader.onload = function fileReadCompleted() {
    console.log(reader.result);
    localStorage.setItem('AkitaStores', reader?.result?.toString() ?? '')
    location.reload();
  };
  reader.readAsText(file);
}

yippee(){
  alert('yippee!')
}

}
