import { Component } from '@angular/core'

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
          (checked)="onNoteChecked(i)"
        ></note-card>
      </div>
    </div>
  </div>
`
})
export class NotesContainer {
  notes = [
    { title: 'This is a note', value: 'Note note note ', color: 'lightblue' },
    { title: 'This is a note too', value: 'Note note note ', color: 'lightyellow' },
    { title: 'This is a note yeah', value: 'Note note note ', color: 'lightgreen' },
  ]


  onNoteChecked(i: number) {
    this.notes.splice(i, 1);
  }

  onNoteCreate(note) {
    this.notes.push(note)
  }


}
