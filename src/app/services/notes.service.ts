
import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { StoreHelper } from './store-helper'


@Injectable()
export class NotesService {
  collection: string = 'notes'
  path: string = '/notes'
  constructor(
    private api: ApiService,
    private storeHelper: StoreHelper
  ) {

  }

  createNote(note) {
    return this.api.post(this.path, note)
      .do(saved => this.storeHelper.add(this.collection, saved))
  }

  getNotes() {
    return this.api.get(this.path)
      .do(resp => this.storeHelper.update(this.collection, resp.data))
  }

  completeNote(note) {
    return this.api.delete(`${this.path}/${note.id}`)
      .do(res => this.storeHelper.findAndDelete(this.collection, res.id))
  }

}
