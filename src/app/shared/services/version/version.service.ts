import { Injectable } from '@angular/core';
import { Version } from '../../enums/version.enum';
import { VersionStore } from './version.store';
import { VersionQuery } from './version.query';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  private latestVersion = Version.two

  constructor(private readonly store: VersionStore,
    private readonly query: VersionQuery) {
  }

  public isLatest(): boolean {
    return this.getVersion() === this.latestVersion;
  }

  public updateVersion(version: Version) {
    return this.store.update({version: version})
  }

  public getVersion(): Version {
    return this.store.getValue().version
  }
}
