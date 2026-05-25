import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { Version } from '../../enums/version.enum';
import { updateVersion } from '../../../store/version/version.actions';
import { selectVersion } from '../../../store/version/version.selectors';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  private latestVersion = Version.two;
  private currentVersion = Version.two;

  constructor(private readonly store: Store) {
    this.store.select(selectVersion).pipe(take(1)).subscribe(v => this.currentVersion = v);
  }

  public isLatest(): boolean {
    return this.currentVersion === this.latestVersion;
  }

  public getVersion(): Version {
    return this.currentVersion;
  }

  public updateVersion(version: Version) {
    this.currentVersion = version;
    this.store.dispatch(updateVersion({ version }));
  }
}
