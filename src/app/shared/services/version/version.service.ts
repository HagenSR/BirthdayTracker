import { Injectable } from '@angular/core';
import { Version } from '../../enums/version.enum';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  public version!: Version
  private latestVersion = Version.two

  constructor() {
    const version = localStorage.getItem('version')
    this.version = version !== null ? version as Version :  Version.one
    this.updateVersion(this.version)
  }

  public isLatest(): boolean {
    return this.version === this.latestVersion;
  }

  public updateVersion(version: Version){
    this.version = version
    localStorage.setItem('version', version)
  }
}
