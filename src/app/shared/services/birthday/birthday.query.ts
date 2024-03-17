import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { BirthdayState } from './birthday.state';
import { BirthdayStore } from './birthday.store';

@Injectable({
  providedIn: 'root'
})
export class BirthdayQuery extends QueryEntity<BirthdayState> {
  constructor(protected override store: BirthdayStore) {
    super(store);
  }
}