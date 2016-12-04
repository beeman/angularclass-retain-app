import { ModuleWithProviders } from '@angular/core'
import { RouterModule } from '@angular/router'


import { About, Auth, Main, NotesContainer } from './containers'
import { AuthService } from './services'

export const routes: ModuleWithProviders = RouterModule.forRoot([
  {
    path: '',
    component: Main,
    canActivate: [ AuthService ],
    children: [
      { path: '', component: NotesContainer },
      { path: 'about', component: About }
    ]
  },
  { path: 'auth', component: Auth },
  {
    path: '**',
    redirectTo: '',
  }
])
