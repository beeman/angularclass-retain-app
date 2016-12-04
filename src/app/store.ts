import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Injectable } from '@angular/core'
import 'rxjs/Rx'
import { stat } from 'fs'

export interface Note {
  color: string
  title: string
  value: string
  id?: string | number
  createdAt?: string
  updatedAt?: string
  userId?: string
}

export interface State {
  notes: Note[]
}

const defaultState: State = {
  notes: []
}

const _store = new BehaviorSubject<State>(defaultState)

@Injectable()
export class Store {
  private store = _store

  changes = this.store.asObservable()
    .distinctUntilChanged()

  setState(state: State) {
    this.store.next(state)
  }

  getState(): State {
    return this.store.value
  }

  purge() {
    this.store.next(defaultState)
  }

}
