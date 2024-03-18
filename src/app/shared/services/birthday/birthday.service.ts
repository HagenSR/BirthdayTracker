import { Injectable } from '@angular/core';
import { BirthdayStore } from './birthday.store';
import { BirthdayQuery } from './birthday.query';
import { Birthday } from '../../models/birthday.model';
import { map, repeat, startWith, timer } from 'rxjs';
import { TimePeriodDuration } from '../../enums/time-period-duration.enum';
import { monthToDuration } from '../../util/records';

@Injectable({
  providedIn: 'root'
})
export class BirthdayService {

  private curId = 0;

  birthdaysGroupedByDuration$ = this.query.selectAll().pipe(
    map((birthdays) => {
      return birthdays.reduce((acc, birthday) => {
        return this.findPlaceForBirthday(acc, birthday)
      }, this.initializeReducer())
    }),
    map((birthdays) => {
      Object.keys(TimePeriodDuration).forEach((period) => {
        birthdays[period as TimePeriodDuration] = birthdays[period as TimePeriodDuration].sort((a, b) => a.birthDay.getTime() - b.birthDay.getTime())
      })
      return birthdays;
    })
  )

  durationsInOrder$ = timer(3.6e+6).pipe(
    startWith(0),
    map(() => {
      const durationsInOrder = [TimePeriodDuration.TODAY, TimePeriodDuration.WEEK, TimePeriodDuration.REMAINDER_OF_MONTH]
      const curMonth = new Date().getMonth() + 1
      for (let i = 0; i < 12; i++) {
        durationsInOrder.push(monthToDuration[(curMonth + i) % 12])
      }
      return durationsInOrder
    }),
    repeat()
  )

  constructor(private readonly store: BirthdayStore,
    public readonly query: BirthdayQuery) {
    this.updateCurId()
    this.updateSerializedStringsToDates()
  }

  addBirthday(birthday: Birthday) {
    let id = birthday.id
    if (id === -1) {
      id = this.curId;
      this.curId++
    }
    const newBirthday = { ...birthday, id: id }
    this.store.upsert(newBirthday.id, newBirthday)
  }

  delete(id: number) {
    this.store.remove(id)
  }

  reset() {
    this.store.reset()
  }

  updateCurId() {
    const ids = this.query.getAll().sort((a, b) => b.id - a.id).map((birthday) => birthday.id);
    if (ids.length > 0) {
      this.curId = ids[0] + 1
    }
  }

  updateSerializedStringsToDates() {
    const birthdays = this.query.getAll().map((birthday) => {
      return { ...birthday, birthDay: new Date(birthday.birthDay) }
    })
    this.store.set(birthdays)
  }

  initializeReducer(): Record<TimePeriodDuration, Birthday[]> {
    return Object.keys(TimePeriodDuration).reduce((acc, field) => {
      acc[field as keyof typeof TimePeriodDuration] = []
      return acc;
    }, {} as Record<TimePeriodDuration, Birthday[]>)
  }

  findPlaceForBirthday(acc: Record<TimePeriodDuration, Birthday[]>, birthday: Birthday): Record<TimePeriodDuration, Birthday[]> {
    const today = new Date()
    const weekFromNow = new Date(today.getDate() + 7)
    const birthdate = birthday.birthDay;
    if (today.getMonth() === birthdate.getMonth() && today.getDate() === birthdate.getDate()) {
      acc[TimePeriodDuration.TODAY].push(birthday)
    }
    else if (today.getMonth() == birthdate.getMonth() && birthdate.getDate() > today.getDate() && birthdate.getDate() < weekFromNow.getDate()) {
      acc[TimePeriodDuration.WEEK].push(birthday)
    }
    else if (today.getMonth() == birthdate.getMonth() && birthdate.getDate() > today.getDate()) {
      acc[TimePeriodDuration.REMAINDER_OF_MONTH].push(birthday)
    }
    else {
      acc[monthToDuration[birthdate.getMonth()]].push(birthday)
    }
    return acc;
  }
}

