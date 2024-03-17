import { EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { BirthdayState } from './birthday.state';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'birthday', resettable: true })
export class BirthdayStore extends EntityStore<BirthdayState> {
  constructor() {
    super({})
  }
}