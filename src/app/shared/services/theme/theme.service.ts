import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  private isLight = false;

  constructor(@Inject(DOCUMENT) private doc: Document) {
  }

  toggleTheme() {
    const themeLink = this.doc.getElementById('app-theme') as HTMLLinkElement
    if (themeLink) {
      themeLink.href = (this.isLight ? 'light_style.css' : 'dark_style.css')
      this.isLight = !this.isLight
    }
  }
}