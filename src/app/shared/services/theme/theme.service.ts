
import { Inject, Injectable, DOCUMENT } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  private isLight = true;

  constructor(@Inject(DOCUMENT) private doc: Document) {
    const theme = localStorage.getItem('theme')
    if (theme !== null && theme === 'false') {
      this.toggleTheme()
    }
  }

  toggleTheme() {
    this.isLight = !this.isLight;
    this.doc.documentElement.classList.toggle('p-dark', !this.isLight);
    localStorage.setItem('theme', '' + this.isLight);
  }
}
