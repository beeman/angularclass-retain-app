import { Component } from '@angular/core'
import { NotesService } from '../services'

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

  constructor(private notesService: NotesService) {
    this.notesService.getNotes()
      .subscribe(resp => this.notes = resp.data)
  }

  onNoteChecked(note) {
    this.notesService.completeNote(note)
      .subscribe(note => {
        const i = this.notes.findIndex(localNote => localNote.id === note.id)
        this.notes.splice(i, 1)
      })
  }

  onNoteCreate(note) {
    this.notesService.createNote(note)
      .subscribe(note => this.notes.push(note))
  }


}
