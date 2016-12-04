import { NgModule }      from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { BrowserModule } from '@angular/platform-browser'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { App, providers, routes } from './app/'
import { About, Auth, Main, NotesContainer } from './app/containers'
import { AppBar, ColorPicker, NoteCard, NoteCreator } from './app/ui'

@NgModule({
  declarations: [
    App,
    About,
    Auth,
    Main,
    AppBar,
    ColorPicker,
    NoteCard,
    NotesContainer,
    NoteCreator,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes
  ],
  bootstrap: [
    App,
  ],
  providers: [ ...providers ],
})

export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule)
