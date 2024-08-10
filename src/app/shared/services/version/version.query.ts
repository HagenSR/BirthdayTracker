import { Query } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { VersionStore } from './version.store';
import { VersionHolder } from '../../models/version-holder.model';

@Injectable({
  providedIn: 'root'
})
export class VersionQuery extends Query<VersionHolder> {
  constructor(protected override store: VersionStore) {
    super(store);
  }
}