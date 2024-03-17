import { Injectable } from '@angular/core';
import { BirthdayStore } from './birthday.store';
import { BirthdayQuery } from './birthday.query';
import { Birthday } from '../../models/birthday.model';

@Injectable({
  providedIn: 'root'
})
export class BirthdayService {

  private curId = 0;

  constructor(private readonly store: BirthdayStore,
    public readonly query: BirthdayQuery) {
    this.updateCurId()
    this.updateSerializedStringsToDates()
  }

  addBirthday(birthday: Birthday) {
    const newBirthday = { ...birthday, id: this.curId }
    this.store.add(newBirthday)
    this.curId++
  }

  reset() {
    this.store.reset()
  }

  updateCurId() {
    const ids = this.query.getAll().sort((a, b) => b.id - a.id).map((birthday) => birthday.id);
    if (ids.length > 0) {
      this.curId = ids[0]
    }
  }

  updateSerializedStringsToDates() {
    const birthdays = this.query.getAll().map((birthday) => {
      return { ...birthday, birthDay: new Date(birthday.birthDay) }
    })
    this.store.set(birthdays)

  }
}

