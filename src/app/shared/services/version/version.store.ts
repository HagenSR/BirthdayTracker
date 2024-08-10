import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Version } from '../../enums/version.enum';
import { VersionHolder } from '../../models/version-holder.model';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'version', resettable: true })
export class VersionStore extends Store<VersionHolder> {
  constructor() {
    super({version: Version.two})
  }
}