import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class Store<T> {
  private state$: BehaviorSubject<T>;

  constructor(initialState: T) {
    this.state$ = new BehaviorSubject<T>(initialState);
  }

  get state(): Observable<T> {
    return this.state$.asObservable();
  }

  get value(): T {
    return this.state$.getValue();
  }
  setState(newState: T): void {
    this.state$.next(newState);
  }

  updateState(updateFn: (state: T) => T): void {
    const updatedState = updateFn(this.value);
    this.state$.next(updatedState);
  }
}
