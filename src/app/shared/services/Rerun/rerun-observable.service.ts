import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, interval, map, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RerunObservableService {

  manualRetrigger = new BehaviorSubject(0);

  private millisecondsInHour = 3.6e+6;

  private timerObservable$ = interval(this.millisecondsInHour).pipe(startWith(0))

  retriggerObservable$ = combineLatest([this.timerObservable$, this.manualRetrigger]).pipe(
    map(() => Date.now())
  )

  currentDate$ = this.retriggerObservable$.pipe(
    startWith(0),
    map(() => new Date())
  )
}

