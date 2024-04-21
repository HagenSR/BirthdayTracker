import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  private isLight = true;

  constructor(@Inject(DOCUMENT) private doc: Document) {
    const theme = localStorage.getItem('theme')
    if(theme !== null && theme === 'false'){
      this.toggleTheme()
    }
  }

  toggleTheme() {
    const themeLink = this.doc.getElementById('app-theme') as HTMLLinkElement
    if (themeLink) {
      this.isLight = !this.isLight
      themeLink.href = (this.isLight ? 'light_style.css' : 'dark_style.css')
      localStorage.setItem('theme', '' + this.isLight)
    }
  }
}