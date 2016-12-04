import { Component } from '@angular/core'
import { NotesService } from '../services'
import { Store } from '../store'


@Component({
  selector: 'notes-container',
  styles: [ `
    .notes {
      padding-top: 50px;
    }
    .creator {
      margin-bottom: 40px; 
    }
  ` ],
  template: `
  <div class="row center-xs notes">
    <div class="col-xs-6 creator">
      <note-creator (createNote)="onNoteCreate($event)"></note-creator>
    </div>
    <div class="notes col-xs-8">
      <div class="row between-xs">
        <note-card
          class="col-xs-4"
          [note]="note"
          *ngFor="let note of notes; let i = index"
          (checked)="onNoteChecked($event)"
        ></note-card>
      </div>
    </div>
  </div>
`
})
export class NotesContainer {
  notes = []

  constructor(
    private notesService: NotesService,
    private store: Store,
  ) {

    this.notesService.getNotes()
      .subscribe()

    this.store.changes.pluck('notes')
      .subscribe((notes: any) => this.notes = notes)
  }

  onNoteChecked(note) {
    this.notesService.completeNote(note)
      .subscribe()
  }

  onNoteCreate(note) {
    this.notesService.createNote(note)
      .subscribe()
  }


}
