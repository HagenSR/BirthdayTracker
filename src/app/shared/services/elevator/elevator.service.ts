import { Injectable, isDevMode } from '@angular/core';
import { VersionService } from '../version/version.service';
import { Version } from '../../enums/version.enum';
import { V1toV2 } from './v1tov2';

@Injectable({
  providedIn: 'root'
})
export class ElevatorService {

  constructor(private versionService: VersionService,
    private v1Tov2: V1toV2
  ) {
    this.updateIfOutOfDate()
  }

  public updateIfOutOfDate() {
    if (!this.versionService.isLatest()) {
      while (!this.versionService.isLatest()) {
        this.updateOneVersion()
      }
      window.location.href = isDevMode() ? 'http://localhost:4200' : 'https://hagensr.github.io/BirthdayTracker';
    }

  }

  private updateOneVersion() {
    switch (this.versionService.getVersion()) {
      case Version.one: {
        this.v1Tov2.update()
        break;
      }
    }
  }

}
